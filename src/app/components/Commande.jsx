import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import InputNumber from './InputNumber';
import { deleteCoffee, updateCoffeeQuantity } from '../reducer/coffee.reducer';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import styles from '../assets/styles/components/commande.module.css';
import Button from '../components/Button';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm'; 
import { LoadUserProfil } from '../api/api.user';

const stripePromise = loadStripe('pk_test_51OAXbxJ2Rv7IDdW6IYpYMHvSzMDpB8lCiTULdAQoI70GVvWfdQ2Oc4iXrmq04KpyTvP4FLQs6cM1CfBS2g1LZzRa00lEpYhV4H');

const Commande = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { coffeeListData } = useSelector((state) => state.coffee);
    const accessToken = useSelector((state) => state.auth);
    const [sumPrice, setSumPrice] = useState(0);
    const [shipDate, setShipDate] = useState('');
    const [coffeeNumbers, setCoffeeNumbers] = useState({});
    const [userAddress, setUserAddress] = useState('');
    const [userName, setUserName] = useState('');


    const handleReturn = () => {
        navigate(-1);
    };

    const notify = (value) => {
        if (value === 'success') {
            toast.success(`Votre commande a été traitée avec succès.`, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
        }
    };

    // coffee number change with id
    const handleCoffeeNumberChange = (itemId, value) => {
        setCoffeeNumbers((prevCoffeeNumbers) => ({
            ...prevCoffeeNumbers,
            [itemId]: value
        }));

        // Redux state update with id
        dispatch(updateCoffeeQuantity({ id: itemId, quantity: value }));
    };

    // delete item from list
    function handleDelete(idToDelete) {
        dispatch(deleteCoffee({ id: idToDelete }));
    }

    useEffect(() => {
        if (coffeeListData) {
            const updatedCoffeeNumbers = {};
            coffeeListData.forEach((item) => {
                updatedCoffeeNumbers[item.id] = item.quantity || 1;
            });
            setCoffeeNumbers(updatedCoffeeNumbers);

            let sum = 0;
            coffeeListData.forEach((item) => {
                sum += item.price * item.quantity;
            });
            setSumPrice(sum.toFixed(2));
        }
    }, [coffeeListData]);

    useEffect(() => {
        let today = new Date();

        const twoDaysLater = new Date(today);
        twoDaysLater.setDate(today.getDate() + 2);

        const fourDaysLater = new Date(today);
        fourDaysLater.setDate(today.getDate() + 4);

        const options = { day: '2-digit', month: 'long', year: '2-digit' };
        twoDaysLater.toLocaleDateString('fr-Fr', options);
        fourDaysLater.toLocaleDateString('fr-Fr', options);

        setShipDate(
            `${twoDaysLater.toLocaleDateString('fr-Fr', options)} - ${fourDaysLater.toLocaleDateString(
                'fr-Fr',
                options
            )}`
        );
    }, []);

    useEffect(() => {
        const handleLoadUserProfile = async () => {
            try {
                const rawResponse = await LoadUserProfil(accessToken);
                const response = rawResponse.data;
                const userData = response.user;

                setUserName(`${userData.firstName} ${userData.lastName}`);

                setUserAddress(
                    `${userData.userAddress[0].detail_address}, ${userData.userAddress[0].ville} ${userData.userAddress[0].post_code}`
                );
            } catch (error) {
                console.log(error.message);
            }
        };

        handleLoadUserProfile();
    }, [accessToken]);


    const handleValide = () => {
        if (accessToken.isLoggedIn === false) {
            notify('failed');
            navigate('/signIn');
        } else {
            notify('success');
            dispatch(addHistory(response.userToken));
        }
    };

    return (
        <div className={styles.commandeBody}>
            <div className={styles.commandeHeader}>
                <NavLink to="/">
                    <Logo width="173px" height="51px" fill="var(--primaryColor)" alt="La capsule logo" />
                </NavLink>
                <h3 className={styles.commandeTitle}>
                    Passer la commande <span>({coffeeListData.length} article)</span>
                </h3>
                <Button width="10rem" height="4rem" onClick={handleReturn}>
                    Retour
                </Button>
            </div>
            <div className={styles.commandeContainer}>
                <div className={styles.commandeLeftContainer}>
                    <div className={styles.commandeDetail}>
                        <p className={styles.boldStyle}>1.</p>
                        <p className={`${styles.detailTitle} ${styles.boldStyle}`}>Adresse de livraison</p>
                        <div className={styles.detailContent}>
                             <p>{userAddress}</p>
                        </div>
                        <Button width="0.5rem" height="1rem" fontSize="1rem">
                            Modifier
                        </Button>
                    </div>
                    <div className={`${styles.commandeDetail} ${styles.middle}`}>
                        <p className={styles.boldStyle}>2.</p>
                        <p className={`${styles.detailTitle} ${styles.boldStyle}`}>Adresse de facturation</p>
                        <div className={styles.detailContent}>
                            <p>{userName}, {userAddress}</p>
                        </div>
                        <Button width="0.5rem" height="1rem" fontSize="1rem">
                            Modifier
                        </Button>
                    </div>
                    <div className={`${styles.commandeDetail}`}>
                        <p className={`${styles.TitleNumberThird} ${styles.boldStyle}`}>3.</p>
                        <p className={`${styles.titleThird} ${styles.boldStyle}`}>
                            Vérification et validation de votre commande
                        </p>
                    </div>
                    <div className={styles.estimateTime}>
                        {coffeeListData.length > 0 ? (
                            <p className={styles.totalPrice}>Date de livraison estimée : {shipDate} </p>
                        ) : (
                            <p className={styles.totalPrice}>Pas d'estimation de livraison</p>
                        )}

                        {coffeeListData.length > 0 ? (
                            coffeeListData.map((item, index) => (
                                <div className={styles.listItem} key={item.id}>
                                    <p className={styles.itemIndex}>{index + 1}.</p>
                                    <img src={item.image} className={styles.productImg} />
                                    <div className={styles.itemName}>{item.name}</div>
                                    <div className={styles.quantityTitle}>
                                        <p className={styles.boldStyle}>Qte : </p>
                                        <InputNumber
                                            value={coffeeNumbers[item.id] || 1}
                                            setValue={(value) => handleCoffeeNumberChange(item.id, value)}
                                            min={1}
                                            precision={0}
                                        />
                                    </div>
                                    <p className={styles.totalPrice}>{(item.price * item.quantity).toFixed(2)} €</p>
                                    <Button
                                        width="15%"
                                        height="3rem"
                                        fontSize="1.2rem"
                                        padding="0"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Supprimer
                                    </Button>
                                    {console.log(item)}
                                </div>
                            ))
                        ) : (
                            <div className={styles.listItem}> Votre commande est vide</div>
                        )}
                    </div>

                    <div className={styles.paymentButtonWrapper}>
                    <Elements stripe={stripePromise}>
                    <CheckoutForm items={coffeeListData} />
                    </Elements>
                        <div className={styles.paymentDetail}>
                            <p className={styles.totalPrice}>Montant total :{sumPrice} € </p>
                            <div>
                                En passant votre commande, vous acceptez les Conditions générales de vente de la capsule.
                                Veuillez consulter notre Notice Protection de vos informations personnelles, notre
                                Notice Cookies et notre Notice Annonces publicitaires basées sur vos centres d’intérêt.
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.commandeRightcontainer}>
                    <Button onClick={handleValide} width="100%" height="5rem" fontSize="1.4rem" padding="0">
                        Passez votre commande et payez
                    </Button>
                    <div>
                        En passant votre commande, vous acceptez les Conditions générales de vente d’Amazon. Veuillez
                        consulter notre Notice Protection de vos informations personnelles, notre Notice Cookies et
                        notre Notice Annonces publicitaires basées sur vos centres d’intérêt.
                    </div>

                    <div className={styles.detailContainer}>
                        <p className={styles.totalPrice}>Récapitulatif de commande</p>
                        <div className={styles.detailPrice}>
                            <div className={styles.priceBeforeSum}>
                                <p>articles:</p> <p>{sumPrice} €</p>
                            </div>
                            <div className={styles.priceBeforeSum}>
                                <p>Livraison:</p> <p>0,00 €</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.priceBeforeSum}>
                            <p className={styles.totalPrice}>Montant total :</p>
                            <p className={styles.totalPrice}>{sumPrice} €</p>
                        </div>
                        <p>
                            Total de la commande, <br /> TVA incluse
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Commande;
