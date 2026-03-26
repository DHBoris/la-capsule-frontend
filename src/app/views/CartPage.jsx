import React from 'react';
import Presentation from '../components/Presentation';
import Footer from '../components/Footer';
import Concept from '../components/Concept';
import Carousel from '../components/Carrousel';
import Produits from '../components/Produits';
import Infos from '../components/Infos';
import cafe1 from '../assets/images/photoCafe1.png';
import cafe2 from '../assets/images/photoCafe2.png';
import cafe3 from '../assets/images/photoCafe3.png';
import cafe4 from '../assets/images/photoCafe4.png';
import cafe5 from '../assets/images/photoCafe5.png';
import cafe6 from '../assets/images/photoCafe6.png';
import cafe7 from '../assets/images/photoCafe7.png';
import cafe8 from '../assets/images/photoCafe8.png';
import Cart from '../components/Cart';

const CartPage = () => {
  return (
    <div className="page">
      <Cart />
      <Presentation />
      <Carousel
        images={[cafe1, cafe2, cafe3, cafe4, cafe5, cafe6, cafe7, cafe8]}
      ></Carousel>
      <Produits />
      <Concept />
      <Infos />
      <Footer />
    </div>
  );
};

export default CartPage;
