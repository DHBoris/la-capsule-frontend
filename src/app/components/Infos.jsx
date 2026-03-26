import React from 'react'
import Map from "../assets/images/Map.png"
import styles from '../assets/styles/components/infos.module.css';

const Infos = () => {
    return (
        <div className={styles.infos}>
            <div className={styles.containerInfos}>
                <div className={styles.wrapperInfos}>
                    <h3 className={styles.infoTitle}>Ou nous trouver ?</h3>

                    <p>123 Rue Houchard, 59200 Tourcoing</p>
                    <p>lacapsule@gmail.com</p>
                    <p>03.26.35.14.52</p>
                </div>

                <div className={styles.wrapperInfos}>
                    <h4 className={styles.infoTitle}>Horaires</h4>

                    <div className={styles.dayWrapper}>
                        <div className={styles.openTime}>
                            <p>Lundi</p>
                            <p>Mardi</p>
                            <p>Mercredi</p>
                            <p>Jeudi</p>
                            <p>Vendredi</p>
                            <p>Samedi</p>
                            <p>Dimanche</p>
                        </div>
                        <div className={styles.openTime}>
                            <p>7:00AM à 7:00PM</p>
                            <p>7:00AM à 7:00PM</p>
                            <p>7:00AM à 7:00PM</p>
                            <p>7:00AM à 7:00PM</p>
                            <p>7:00AM à 7:00PM</p>
                            <p>7:00AM à 7:30PM</p>
                            <p>9:00AM à 6:30PM</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${styles.containerInfos} ${styles.map}`}>
                <img className={styles.map} src={Map} alt="Carte" />
            </div>
        </div>
    );
}

export default Infos
