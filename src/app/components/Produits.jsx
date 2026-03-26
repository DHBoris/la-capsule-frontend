import React, { useEffect, useState } from 'react';
import EspressoImg from '../assets/images/espresso@2x.webp';
import CappuccinoImg from '../assets/images/cappuccino@2x.webp';
import personnaliseImg from '../assets/images/cafePersonnalise@2x.webp';
import styles from '../assets/styles/components/produit.module.css';
import Modal from './Modal';
import Button from './Button';
import CafePerso from './CafePerso';
import { Espresso, Cappuccino } from './CafeNormal';


const Produits = () => {
    const [showModal, setShowModal] = useState(false); // État pour contrôler l'affichage du modal
    const [popupType, setPopupType] = useState('');
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    const imageRatio = 1.096;  // Le ratio entre la largeur et la hauteur des images
    const gap = 20;
    const width = ((viewportWidth - (gap * 2)) / 3);  // Calcul de la largeur d'affichage
    const height = width * imageRatio * 1.2; // On calcul la hauteur que devraient faire les elements

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        // Retire l'écouteur d'événements lors du démontage
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const handleResize = () => {
        setViewportWidth(window.innerWidth);
    };

    const handlePersoOpenModal = () => {
        setPopupType('Perso');
        setShowModal(true); // Met à jour l'état pour afficher le modal
    };

    const handleEspressoOpenModal = () => {
        setPopupType('Espresso');
        setShowModal(true); // Met à jour l'état pour afficher le modal
    };

    const handleCappucinoOpenModal = () => {
        setPopupType('Cappuccino');
        setShowModal(true); // Met à jour l'état pour afficher le modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Met à jour l'état pour masquer le modal
    };

    const handleKeyDown = (e) => {
        const key = e.key;
        const target = e.target;

        if (key !== ' ' && key !== 'Enter') return;
        if (target.tagName === 'IMG') target.click();
    };

    return (
      <section id={styles.produit}>
        <h3>Nos produits</h3>
        <div
          className={styles.produitCards}
          onKeyDown={handleKeyDown}
          style={{ height: height }}
        >
          <img
            className={styles.produitImg}
            src={EspressoImg}
            alt="espresso"
            onClick={handleEspressoOpenModal}
            tabIndex={0}
          />
          <img
            className={styles.produitImg}
            src={CappuccinoImg}
            alt="cappucino"
            onClick={handleCappucinoOpenModal}
            tabIndex={0}
          />
          <img
            className={styles.produitImg}
            src={personnaliseImg}
            alt="cafe personnalisé"
            onClick={handlePersoOpenModal}
            tabIndex={0}
          />

          {showModal && (
            <Modal onClose={handleCloseModal} isAutoClose={false}>
              {popupType === 'Espresso' && (
                <div className="modalPersonnalisation">
                  <Espresso />
                  <Button margin="0 auto" onClick={handleCloseModal}>
                    Retour
                  </Button>
                </div>
              )}
              {popupType === 'Cappuccino' && (
                <div className="modalPersonnalisation">
                  <Cappuccino />
                  <Button margin="0 auto" onClick={handleCloseModal}>
                    Retour
                  </Button>
                </div>
              )}
              {popupType === 'Perso' && (
                <div className="modalPersonnalisation">
                  <CafePerso />
                  <Button margin="0 auto" onClick={handleCloseModal}>
                    Retour
                  </Button>
                </div>
              )}
            </Modal>
          )}
        </div>
      </section>
    );
};

export default Produits;
