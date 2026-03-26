import React from 'react';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import styles from '../assets/styles/components/footer.module.css';

const Footer = () => {
  return (
    <footer>
      <div id={styles.logo}>
        <Logo
          width="399px"
          height="83px"
          fill="var(--fifthColor)"
          alt="logo la capsule"
        />
      </div>
      <div id={styles.descriptionFooter}>
        <div id={styles.coordonnées}>
          <h3>OU NOUS TROUVER ?</h3>
          <p>123 Rue Houchard, 59200 Tourcoing</p>
          <p>lacapsule@gmail.com</p>
          <p>03.26.35.14.52</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
