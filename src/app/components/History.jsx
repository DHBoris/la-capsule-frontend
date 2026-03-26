import React, { useState, useRef } from 'react';
import styles from '../assets/styles/components/history.module.css';
import { ReactComponent as Anchor } from '../assets/images/anchor.svg';
import Button from './Button';
import Upload from './Upload';
import panierImg1 from '../assets/images/panier1.png';
import panierImg2 from '../assets/images/panier2.png';
import panierImg3 from '../assets/images/panier3.png';
import panierImg4 from '../assets/images/panier4.png';
import panierImg5 from '../assets/images/panier5.png';
import decoImg from '../assets/images/but_first_coffee.png';
import CappuccinoImg from '../assets/images/cappuccino.png';

  const INITIAL_VALUES = {
    id: Date.now(),
    tag: [],
    imgFIle: null,
  };

const History = ({ initialValues = INITIAL_VALUES }) => {
  const price = 9.95;
  const scrollRef = useRef(null);
  const [values, setValues] = useState(initialValues);

  // scroll when arrow button is clicked
  const scrollToElement = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // show date for products
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    return date.toLocaleDateString('fr-FR', options);
  }

  // input value change when button is clicked
  const handleChange = (name, value) => {
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  // test codes - will be deleted after end
  const coffeeListData = [
    {
      id: Date.now(),
      name: 'Cappuccino',
      image: CappuccinoImg,
      liter: 350,
      price: price,
      quantity: 1,
    },
    {
      id: 123123,
      name: 'Cappuccino',
      image: CappuccinoImg,
      liter: 350,
      price: price,
      quantity: 2,
    },
  ];

  return (
      <div>
          {/* Top image */}
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
                      Voir <br /> mes commandes
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
          {/* order history */}
          <div ref={scrollRef}>
              {coffeeListData.length > 0 ? (
                  coffeeListData.map((item) => (
                      <React.Fragment key={item.id}>
                          {/* {console.log(item)} */}
                          <div className={styles.productList}>
                              <img src={item.image} className={styles.productImg} />
                              <h4>{formatDate(item.id)}</h4>
                              <h3>
                                  {item.price * item.quantity}€<span className={styles.unit}>TTC</span>
                              </h3>
                              <div className={styles.quantityNumber}>{item.quantity}</div>
                              <h4> C1234123 </h4>

                              <div className={styles.recommandeButton}>
                                  <Button fontSize="2rem">Recommander</Button>
                              </div>
                          </div>
                      </React.Fragment>
                  ))
              ) : coffeeListData === undefined || coffeeListData.length === 0 ? (
                  <h1 id={styles.emptyText}>Votre historique est vide.</h1>
              ) : (
                  <h1 id={styles.emptyText}>Une erreur est survenue.</h1>
              )}
          </div>
          {/* upload image */}
          <Upload name="imgFile" value={values.imgFile} initialPreview={values.imgFile} onChange={handleChange} />
      </div>
  );
};

export default History;
