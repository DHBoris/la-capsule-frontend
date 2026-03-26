import React from "react";
import horaire from "../../app/assets/images/logos/logo_horaire.svg";
import livraison from "../../app/assets/images/logos/logo_livraison.svg";
import localisation from "../../app/assets/images/logos/logo_loc.svg";
import prix from "../../app/assets/images/logos/logo_prix.svg";
import styles from '../assets/styles/components/concept.module.css';

const Concept = () => {
  return (
    <div className={styles.concept}>
      <h3>Notre concept livraison</h3>
      <div className={styles.wrapperConcept}>
        <div className={styles.contentConcept}>
          <img className={styles.logoConcept} src={livraison} alt="" />
          <p>Livraison gratuite et 100% électrique</p>
        </div>
        <div className={styles.contentConcept}>
          <img className={styles.logoConcept} src={prix} alt="" />
          <p>Moins cher que le géant Américain du café et plein de promos</p>
        </div>
        <div className={styles.contentConcept}>
          <img className={styles.logoConcept} src={horaire} alt="" />
          <p>Livraison à tout moment</p>
        </div>
        <div className={styles.contentConcept}>
          <img className={styles.logoConcept} src={localisation} alt="" />
          <p>De nombreux points de livraisons</p>
        </div>
      </div>
    </div>
  );
};

export default Concept;
