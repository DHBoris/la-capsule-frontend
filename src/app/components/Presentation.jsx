import React from "react";
import Button from "./Button";
import tableCoffee_webp from "../assets/images/cafestable-1.webp";
import tableCoffee_15_webp from "../assets/images/cafestable-1@1.5x.webp";
import tableCoffee_png from "../assets/images/cafestable-1.png";
import tableCoffee_15_png from "../assets/images/cafestable-1@1.5x.png";
import persoCafe_webp from "../assets/images/persocafe-1.webp";
import persoCafe_2_webp from "../assets/images/persocafe-1@2x.webp";
import persoCafe_png from "../assets/images/persocafe-1.png";
import persoCafe_2_png from "../assets/images/persocafe-1@2x.png";
import styles from '../assets/styles/components/presentation.module.css';

const Presentation = () => {
  return (
    <div className={styles.presentation}>
      <div className={styles.section}>
        <picture className={styles.tableCoffe}>
          <source
            srcSet={`${tableCoffee_15_webp} 1.5x, ${tableCoffee_webp} 1x`}
            type="image/webp"
          />
          <source srcSet={`${tableCoffee_15_png} 1.5x`} />
          <img
            src={tableCoffee_png}
            alt="Table présentant des cafés"
            type="image/png"
          />
        </picture>

        <div className={styles.contentPresentation}>
          <h2>Personnaliser son café</h2>
          <p>
            Grâce à un algorithme simple et rapide, répondez à 4 questions pour
            nous permettre de découvrir qui vous êtes et les moments que vous
            associez à votre café préféré. Nous créerons alors un café rien que
            pour vous et qui correspondra à vos goûts !
          </p>
          <div>
            <Button>
              Personnaliser votre café
            </Button>
          </div>
        </div>
      </div>
      <div className={`${styles.section} ${styles.sectionLeft}`}>
        <div className={styles.contentPresentation}>
          <h2>Concevoir son café</h2>
          <p>
            Parce que vous êtes unique, nous vous proposons de déguster le café
            torréfié spécialement pour vous !
          </p>
          <div>
            <Button outline={true}>
              En savoir +
            </Button>
          </div>
        </div>
        <div className={`${styles.imgContainer} ${styles.imgPersoCafe}`}>
          <picture>
            <source
              srcSet={`${persoCafe_2_webp} 2x, ${persoCafe_webp} 1x`}
              type="image/webp"
            />
            <source
              srcSet={`${persoCafe_2_png} 2x`}
              type="image/png"
            />
            <img src={persoCafe_png} alt="personalCoffee" />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
