import React from 'react';
import styles from '../assets/styles/components/notFound.module.css';
import { NavLink } from 'react-router-dom';
import notFoundImg from '../assets/images/notFound.png';
import notFoundFleche from '../assets/images/fleche1.png';

const NotFound = () => {
    return (
        <div id={styles.notFoundWrapper}>
            <h1 id={styles.notFoundTitle}>
                Il semblerait <br />
                que vous vous soyez égaré
            </h1>
            <div id={styles.notFoundContentWrapper}>
                <img id={styles.notFoundImg} src={notFoundImg} alt={'notFoundImg'} />
                <div>
                    <h2>
                        Veuillez retourner vers <br /> nos succulents cafés
                    </h2>
                    <div id={styles.notFoundSubWrapper}>
                        <h3 id={styles.notFoundButton}>
                            <NavLink id={styles.notFoundLink} to="/">
                                ICI
                            </NavLink>
                        </h3>

                        <img src={notFoundFleche} alt={'notFoundFleche'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
