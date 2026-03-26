import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from '../assets/styles/components/cart.module.css';
import Button from './Button';
import InputNumber from './InputNumber';
import { formatNumber } from '../utils/functions';
import { addCoffee, deleteCoffee, updateCoffeeQuantity } from '../reducer/coffee.reducer';
import { CartLoad, CartDelete } from '../api/api.index';
import { ReactComponent as Anchor } from '../assets/images/anchor.svg';
import { ReactComponent as HeartImg } from '../assets/images/likes.svg';
import panierImg1 from '../assets/images/panier1.png';
import panierImg2 from '../assets/images/panier2.png';
import panierImg3 from '../assets/images/panier3.png';
import panierImg4 from '../assets/images/panier4.png';
import panierImg5 from '../assets/images/panier5.png';
import decoImg from '../assets/images/but_first_coffee.png';
import trashImg from '../assets/images/trash.png';

const Cart = () => {
    const scrollRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [coffeeNumbers, setCoffeeNumbers] = useState({});
    const { coffeeListData } = useSelector((state) => state.coffee);
    const accessToken = useSelector((state) => state.auth);

    const notify = (value) => {
        if (value === 'failed') {
            toast.warn(`La connexion est requise.`, {
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

    useEffect(() => {
        const handleProduct = async () => {
            if (accessToken.isLoggedIn === true) {
                const rawResponse = await CartLoad(accessToken.userToken);
                console.log(rawResponse);
                if (rawResponse.data.cartList && rawResponse.data.cartList > 0) {
                dispatch(addCoffee(rawResponse.data.cartList));
                }
            }
        };
        handleProduct();
    }, []);

    useEffect(() => {
        if (coffeeListData !== undefined && coffeeListData.length > 0) {
            const updatedCoffeeNumbers = {};
            coffeeListData.forEach((item) => {
                updatedCoffeeNumbers[item.id] = item.quantity || 1;
            });
            setCoffeeNumbers(updatedCoffeeNumbers);
            //   CartAdd(coffeeListData);
            console.log(coffeeListData);
        }
    }, [coffeeListData]);

    // scroll when arrow button is clicked
    const scrollToElement = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleValide = () => {
        if (accessToken.isLoggedIn === false) {
            notify('failed');
            navigate('/signIn');
        } else {
            navigate('/commande');
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

    // calculate total price with coffeeNumber
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        if (coffeeListData && coffeeListData.length > 0) {
            coffeeListData.forEach((item) => {
                const coffeeNumber = coffeeNumbers[item.id] || 1;
                totalPrice += (item.price || 0) * coffeeNumber;
            });
        }
        return totalPrice.toFixed(2);
    };

    // delete item from list
    const handleDelete = async (idToDelete) => {
         const rawResponse = await CartDelete(accessToken.userToken, idToDelete);
         console.log(idToDelete);
        dispatch(deleteCoffee({ id: idToDelete }));
    }

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
                        Voir <br /> mon Panier
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
                {coffeeListData && coffeeListData.length > 0 ? (
                    coffeeListData.map((item) =>
                        item ? (
                            <div className={styles.productList} key={item.id}>
                                <img src={item.image} className={styles.productImg} />
                                <h4>
                                    {item.size} <span className={styles.unit}>ml</span>
                                </h4>
                                <h3>
                                    {formatNumber(item.price * (coffeeNumbers[item.id] || 1), 2)}€
                                    <span className={styles.unit}>TTC</span>
                                </h3>
                                <InputNumber
                                    value={coffeeNumbers[item.id] || 1}
                                    setValue={(value) => handleCoffeeNumberChange(item.id, value)}
                                    min={1}
                                    precision={0}
                                />
                                <HeartImg stroke="var(--primaryColor)" cursor="pointer" />
                                <img src={trashImg} className={styles.trashImg} onClick={() => handleDelete(item.id)} />
                            </div>
                        ) : null
                    )
                ) : coffeeListData === undefined || coffeeListData.length === 0 ? (
                    <h1 id={styles.emptyText}>Votre panier est vide.</h1>
                ) : (
                    <h1 id={styles.emptyText}>Une erreur est survenue.</h1>
                )}
            </div>
            <div id={styles.cartPriceWrapper}>
                <div id={styles.cartPrice}>
                    <p id={styles.cartLivraison}>Livraison gratuite</p>
                    <h3>
                        {calculateTotalPrice()}€ <span className={styles.unit}>TTC</span>
                    </h3>
                </div>
                <div className={styles.valideButton}>
                    <Button onClick={handleValide}>Valider le panier</Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
