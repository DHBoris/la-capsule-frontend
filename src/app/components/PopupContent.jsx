// PopupContentA.js
import React, { useState } from 'react';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import styles from '../assets/styles/components/popupcontent.module.css';
import Button from './Button';

export const PopupContentCreate = () => {
  return (
    <div className={styles.popupContent}>
      <h2 className={styles.popupTitle}>
        Felicitations, <br /> Votre inscription a bien été pris en <br /> compte
      </h2>
      <p className={styles.popupText}>
        Veuillez verifier votre boite mail ainsi que confirmer <br /> votre
        demande de création grâce au lien dans le <br /> mail de confirmation
      </p>
      <div className={styles.logoContainer}>
        <Logo
          width="192px"
          height="40px"
          fill="var(--primaryColor)"
          alt="La capsule logo"
        />
      </div>
    </div>
  );
};

export const PopupContentSupression = ({ onClose }) => {

  const handleCancle = () => {
    console.log('Cancle');
  }

    const handleSuppresion = () => {
      console.log('Suppresion');
    };

  return (
    <div className={styles.popupContent}>
      <h2 className={styles.popupTitle}>
        Etes vous sure de vouloir supprimer <br /> votre compte
      </h2>
      <div className={styles.logoContainer}>
        <Logo
          width="192px"
          height="40px"
          fill="var(--primaryColor)"
          alt="La capsule logo"
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button
          textColor="var(--fifthColor)"
          backgroundColor="var(--secondaryColor)"
          width="278px"
          height="58px"
          onClick={handleCancle}
        >
          <p className={styles.popupButtonText}>J’ai changé d’avis</p>
        </Button>
        <Button
          backgroundColor="var(--fifthColor)"
          width="278px"
          height="58px"
          onClick={handleSuppresion}
        >
          <p className={styles.popupButtonText}>Oui, je suis sûre</p>
        </Button>
      </div>
    </div>
  );
};

export const PopupContentSupConfirm = ({ onClose }) => {
  return (
    <div className={styles.popupContent}>
      <h2 className={styles.popupTitle}>Votre compte a bien été supprimer,</h2>
      <h2 className={styles.popupTitle}>
        Revenez-nous vite, <br /> Vous allez nous manquer
      </h2>
      <div className={styles.logoContainer}>
        <Logo
          width="192px"
          height="40px"
          fill="var(--primaryColor)"
          alt="La capsule logo"
        />
      </div>
    </div>
  );
};

export const PopupContentRetour = ({ onClose }) => {
  return (
    <div className={styles.popupContent}>
      <h2 className={styles.popupTitle}>
        Merci de nous faire part de votre <br /> retour
      </h2>
      <p className={styles.popupText}>
        Nous vous répondrons dans les délais les plus brefs. <br /> A bientôt.
      </p>
      <div className={styles.logoContainer}>
        <Logo
          width="192px"
          height="40px"
          fill="var(--primaryColor)"
          alt="La capsule logo"
        />
      </div>
    </div>
  );
};
