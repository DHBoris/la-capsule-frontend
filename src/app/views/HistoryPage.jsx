import React from 'react';
import Footer from '../components/Footer';
import Concept from '../components/Concept';
import PhotoCarrousel from '../components/PhotoCarrousel';
import Produits from '../components/Produits';
import Infos from '../components/Infos';
import History from '../components/History';

const CartPage = () => {
    return (
        <div className="page">
            <History />
            <PhotoCarrousel />
            <Produits />
            <Concept />
            <Infos />
            <Footer />
        </div>
    );
};

export default CartPage;
