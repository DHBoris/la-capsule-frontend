import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from '../assets/styles/components/history.module.css';
import { ReactComponent as Anchor } from '../assets/images/anchor.svg';
import { GetOrders } from '../api/api.index';
import panierImg1 from '../assets/images/panier1.png';
import panierImg2 from '../assets/images/panier2.png';
import panierImg3 from '../assets/images/panier3.png';
import panierImg4 from '../assets/images/panier4.png';
import panierImg5 from '../assets/images/panier5.png';
import decoImg from '../assets/images/but_first_coffee.png';

const History = () => {
    const scrollRef = useRef(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userToken } = useSelector((state) => state.auth);

    const scrollToElement = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
        return date.toLocaleDateString('fr-FR', options);
    }

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await GetOrders(userToken);
                if (res?.data?.result) {
                    setOrders(res.data.orders);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        if (userToken) fetchOrders();
        else setLoading(false);
    }, [userToken]);

    return (
        <div>
            <div className={styles.cartTopWrapper}>
                <div className={styles.cartImgWrapper}>
                    <img id={styles.cartImg1} src={panierImg1} alt="panierImg1" />
                    <img id={styles.cartImg2} src={panierImg2} alt="panierImg2" />
                    <img id={styles.cartImg3} src={panierImg3} alt="panierImg3" />
                    <img id={styles.cartImg4} src={panierImg4} alt="panierImg4" />
                    <img id={styles.cartImg5} src={panierImg5} alt="panierImg5" />
                    <img id={styles.decoImg} src={decoImg} alt="decoImg" />
                </div>
                <div id={styles.cartTextWrapper}>
                    <h1 id={styles.cartTitle}>
                        Voir <br /> mes commandes
                    </h1>
                    <Anchor
                        width="192px"
                        height="41px"
                        fill="var(--fifthColor)"
                        alt="anchor Image"
                        cursor="pointer"
                        onClick={scrollToElement}
                    />
                </div>
            </div>

            <div ref={scrollRef}>
                {loading ? (
                    <h1 id={styles.emptyText}>Chargement...</h1>
                ) : orders.length === 0 ? (
                    <h1 id={styles.emptyText}>Votre historique est vide.</h1>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className={styles.orderCard}>
                            <div className={styles.orderHeader}>
                                <span className={styles.orderDate}>{formatDate(order.date)}</span>
                                <span className={styles.orderRef}>
                                    {order.stripeRef ? `Réf. ${order.stripeRef.slice(0, 20)}...` : ''}
                                </span>
                                <span className={styles.orderTotal}>{Number(order.total).toFixed(2)} €</span>
                            </div>
                            {order.items.map((item, i) => (
                                <div className={styles.productList} key={i}>
                                    {item.image && <img src={item.image} className={styles.productImg} alt={item.name} />}
                                    <h4>{item.name}</h4>
                                    <h3>
                                        {((item.price || 0) * (item.quantity || 1)).toFixed(2)} €
                                        <span className={styles.unit}> TTC</span>
                                    </h3>
                                    <div className={styles.quantityNumber}>x{item.quantity || 1}</div>
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default History;
