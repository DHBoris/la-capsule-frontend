import React from "react";
import ImagePartagez from "../assets/images/partagez.png";
import ImageButFirstCoffee from "../assets/images/but_first_coffee.png";
import Button from "./Button";
import styles from '../assets/styles/components/partagez.module.css';

const Partagez = () => {
	return (
        <section className={styles.partagez}>
            <div className={styles.partagezPhoto}>
                <img src={ImagePartagez} alt="" />
            </div>
            <div className={styles.partagezContent}>
                <h1>Vos conceptions</h1>
                <h2>
                    Concevez vos cafés et <br />
                    partagez les
                </h2>
                    <img className={styles.partagezBackground} src={ImageButFirstCoffee} alt="" />
                    <Button textColor="white" backgroundColor="var(--secondaryColor)">
                        Nos produits
                    </Button>
            </div>
        </section>
    );
};

export default Partagez;
