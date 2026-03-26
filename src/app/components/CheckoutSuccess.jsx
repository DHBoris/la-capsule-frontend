import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearCart } from '../reducer/coffee.reducer';
import { OrderConfirmation } from '../api/api.index';
import Button from './Button';
import styles from '../assets/styles/components/checkoutSuccess.module.css';
import jwtDecode from 'jwt-decode';

const CheckoutSuccess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const emailSent = useRef(false);

    const { coffeeListData } = useSelector((state) => state.coffee);
    const { userToken } = useSelector((state) => state.auth);

    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get('session_id');

    const total = coffeeListData.reduce((sum, item) => {
        return sum + (item.price || 0) * (item.quantity || 1);
    }, 0).toFixed(2);

    useEffect(() => {
        if (emailSent.current || coffeeListData.length === 0) return;
        emailSent.current = true;

        let email = '';
        let firstName = '';
        try {
            const decoded = jwtDecode(userToken);
            email = decoded.email || '';
            firstName = decoded.firstName || '';
        } catch (e) {}

        OrderConfirmation({
            email,
            firstName,
            items: coffeeListData,
            total,
            orderId: sessionId
        });

        setTimeout(() => dispatch(clearCart()), 0);
    }, []);

    return (
        <div className={styles.page}>

            {/* HERO */}
            <div className={styles.hero}>
                <div className={styles.checkIcon}>✅</div>
                <h1 className={styles.heroTitle}>Commande confirmée !</h1>
                <p className={styles.heroSubtitle}>
                    Merci pour votre commande. Un email de confirmation vous a été envoyé.
                </p>
                {sessionId && (
                    <span className={styles.orderId}>
                        Réf. {sessionId.slice(0, 28)}...
                    </span>
                )}
            </div>

            {/* ORDER SUMMARY CARD */}
            {coffeeListData.length > 0 && (
                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>Récapitulatif de votre commande</h2>

                    <div className={styles.tableHeader}>
                        <span className={styles.tableHeaderCell}>Produit</span>
                        <span className={styles.tableHeaderCell}>Qté</span>
                        <span className={styles.tableHeaderCell}>Prix</span>
                    </div>

                    {coffeeListData.map((item) => (
                        <div className={styles.item} key={item.id}>
                            <span className={styles.itemName}>{item.name || 'Café'}</span>
                            <span className={styles.itemQty}>× {item.quantity || 1}</span>
                            <span className={styles.itemPrice}>
                                {((item.price || 0) * (item.quantity || 1)).toFixed(2)} €
                            </span>
                        </div>
                    ))}

                    <div className={styles.totals}>
                        <div className={styles.totalRow}>
                            <span>Livraison</span>
                            <span style={{ color: '#1f3a30', fontWeight: 'bold' }}>Gratuite</span>
                        </div>
                        <div className={styles.totalRowMain}>
                            <span className={styles.totalLabel}>Total</span>
                            <span className={styles.totalAmount}>{total} €</span>
                        </div>
                    </div>
                </div>
            )}

            {/* INFO BOX */}
            <div className={styles.infoBox}>
                <span className={styles.infoIcon}>📧</span>
                <p className={styles.infoText}>
                    Un email de confirmation avec le détail de votre commande vous a été envoyé.
                    Votre café sera préparé avec soin et vous sera livré rapidement.
                </p>
            </div>

            {/* ACTIONS */}
            <div className={styles.actions}>
                <Button
                    backgroundColor="var(--secondaryColor)"
                    textColor="white"
                    onClick={() => navigate('/')}
                >
                    Retour à l'accueil
                </Button>
                <Button
                    outline={true}
                    textColor="var(--primaryColor)"
                    onClick={() => navigate('/history')}
                >
                    Voir mes commandes
                </Button>
            </div>

        </div>
    );
};

export default CheckoutSuccess;
