import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCoffee } from '../reducer/coffee.reducer';
import { CartAdd } from '../api/api.index';
import { ToastContainer, toast } from 'react-toastify';
import { formatNumber } from '../utils/functions';
import InputNumber from './InputNumber';
import Button from './Button';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../assets/styles/components/cafeNormal.module.css';
import Logo from '../assets/images/logos/logo_likesViolet.svg';
import EspressoImg from '../assets/images/espresso@2x.webp';
import CappuccinoImg from '../assets/images/cappuccino@2x.webp';

export const Espresso = () => {
    const dispatch = useDispatch();
    const price = 4.95;
    const [coffeeNumber, setCoffeeNumber] = useState(1);
    const accessToken = useSelector((state) => state.auth.userToken);

    const notify = (value) => {
        if (value === 'success') {
            toast.success(`Votre choix a été ajouté avec succès à votre panier`, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
        } else if (value === 'failure') {
            toast.warn(`une erreur est survenue`, {
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

    function handleAdd() {
        const coffeeItem = {
            id: Date.now(),
            name: 'Espresso',
            origin: 'Guatemala',
            image: EspressoImg,
            vegan: false,
            type: 'normal',
            caffeine: true,
            size: 40,
            price: price,
            quantity: coffeeNumber
        };
        if (coffeeItem) {
            notify('success');
            dispatch(addCoffee(coffeeItem));
            CartAdd(accessToken, coffeeItem);
        } else {
            notify('failure');
        }
        // console.log(coffeeItem);
    }

    return (
        <div className={styles.cafeNormal}>
            <img src={EspressoImg}></img>
            <div className={styles.textNormal}>
                <div>
                    <h3>Espresso</h3>
                    <p className={styles.paragrapheNormal}>
                        L'espresso ou café court est un café très corsé avec un fort arôme, obtenu par percolation sous
                        haute pression, c'est-à-dire en faisant passer rapidement de l'eau chaude sous une pression de 9
                        bars à travers du café finement moulu et torréfié.
                    </p>

                    <h4>40 ML</h4>

                    <div className={styles.priceNormal}>
                        <h3>{formatNumber(price * coffeeNumber, 2)}€ TTC</h3>
                        <img src={Logo} alt="Logo" />
                    </div>
                    <div className={styles.priceNormal}>
                        <InputNumber value={coffeeNumber} setValue={setCoffeeNumber} min={1} precision={0} />
                        <Button onClick={handleAdd}>Ajouter au panier</Button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export const Cappuccino = () => {
    const dispatch = useDispatch();
    const price = 7.95;
    const [coffeeNumber, setCoffeeNumber] = useState(1);
    const accessToken = useSelector((state) => state.auth.userToken);

    function handleAdd() {
        const coffeeItem = {
            id: Date.now(),
            name: 'Cappuccino',
            origin: 'Guatemala',
            image: CappuccinoImg,
            vegan: false,
            type: 'normal',
            caffeine: true,
            size: 350,
            price: price,
            quantity: coffeeNumber
        };
        if (coffeeItem) {
            notify('success');
            dispatch(addCoffee(coffeeItem));
            CartAdd(accessToken, coffeeItem);
        } else {
            notify('failure');
        }
        // console.log(coffeeItem);
    }

    const notify = (value) => {
        if (value === 'success') {
            toast.success(`Votre choix a été ajouté avec succès à votre panier`, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
        } else if (value === 'failure') {
            toast.warn(`une erreur est survenue`, {
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

    return (
        <div className={styles.cafeNormal}>
            <img src={CappuccinoImg}></img>
            <div className={styles.textNormal}>
                <div>
                    <h3>Cappuccino</h3>
                    <p className={styles.paragrapheNormal}>
                        Le cappuccino est une préparation de café, à base de café espresso, mélangé avec du lait et
                        coiffé d'une mousse de lait crémeuse (préalablement chauffé à la vapeur jusqu'à le faire
                        mousser), sucré, et servi dans une grande tasse à café, éventuellement avec un effet artistique
                        de latte art.
                    </p>

                    <h4>350 ML</h4>

                    <div className={styles.priceNormal}>
                        <h3>{formatNumber(price * coffeeNumber, 2)}€ TTC</h3>
                        <img src={Logo} alt="Logo" />
                    </div>
                    <div className={styles.priceNormal}>
                        <InputNumber value={coffeeNumber} setValue={setCoffeeNumber} min={1} precision={0} />
                        <Button onClick={handleAdd}>Ajouter au panier</Button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};
