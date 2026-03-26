import React from 'react'
import ImageConcept1 from "../assets/images/img1_valeurs.png";
import ImageConcept2 from "../assets/images/img2_valeurs.png";
import Button from './Button';
import Grain from "../assets/images/logos/logo_grain.svg";
import Tasse from "../assets/images/logos/logo_tasse.svg";
import LivraisonWhite from "../../app/assets/images/logos/logo_livraisonWhite.svg";
import styles from '../assets/styles/components/valeurs.module.css';


const Valeurs = () => {
    return (
        <div className={styles.valeurs}>
            <div className={styles.sectionConcept}>
                <div className={styles.contentConceptPage}>
                    <div className={`${styles.wrapperConceptPage} ${styles.imgWrapper}`}>
                        <img src={ImageConcept1} alt="" />
                        <div className={styles.btnConcept}>
                            <Button textColor="white" backgroundColor="var(--secondaryColor)">
                                Nos produits
                            </Button>
                        </div>
                    </div>

                    <div className={`${styles.wrapperConceptPage} ${styles.textConcept}`}>
                        <h1>Notre concept</h1>
                        <h2 className={styles.titleH2}>
                            La Capsule : <br />
                            torréfacteur à Lille
                        </h2>
                        <h3 className={styles.titleH3}>engagé pour le goût et l’éthique</h3>
                        <p>
                            Dans notre pays reconnu pour sa gastronomie et son terroir, il est pourtant difficile de
                            trouver un café de qualité, riche en arômes et agréable à partager en fin de repas avec des
                            amis ou lors d’une pause entre collègues. <br /> <br />
                            Face à ce constat, nous avons pris les choses en main. Voilà comment l’aventure La Capsule a
                            commencé et comment nous sommes devenus torréfacteurs à Lille !
                        </p>
                    </div>
                </div>
                <div className={styles.contentConceptPage}>
                    <div className={`${styles.wrapperConceptPage} ${styles.textConcept}`}>
                        <p className={styles.titre}>
                            DEUX PASSIONNÉS DE CAFÉ, UNE ENVIE COMMUNE : <br />
                            RÉINVENTER VOS « MOMENTS CAFÉ »
                        </p>
                        <p>
                            Torréfier est passionnant pour obtenir un café gourmet et entièrement personnalisé, nous
                            serons heureux de vous accueillir au sein de notre magasin de café en plein cœur de
                            Tourcoing (autour d’un bon café de spécialité !) pour partager notre passion. <br /> <br />
                            Dans le cadre de nos ateliers de dégustation, nous vous ferons alors découvrir toutes les
                            subtilités d’un café d’exception et l’art de la torréfaction artisanale à Lille !<br />
                            <br /> Que vous soyez entrepreneur, restaurateur, commerçant (épicerie fine, boulangerie…)
                            ou particulier, la qualité de notre savoir-faire artisanal, nous vous accompagneront où que
                            vous soyez.
                            <br />
                            <br />
                            Alors profitez d’un moment chaleureux entre amis ou entre collègue.
                        </p>
                    </div>

                    <div className={styles.wrapperConceptPage}>
                        <img src={ImageConcept2} alt="" />
                    </div>
                </div>
            </div>

            <div className={styles.sectionValeurs}>
                <h2>Des valeurs éthiques et gourmandes</h2>

                <div className={styles.contentValeurs}>
                    <div className={styles.wrapperValeurs}>
                        <div className={styles.logoValeurs}>
                            <img src={LivraisonWhite} alt="" />
                        </div>
                        <p className={styles.titre}>Une livraison gratuite et écolo</p>
                        <p>
                            Tout comme les livreurs de lait d’antan, nous livrons nos clients toujours à l’heure. Dans
                            votre panier de courses vous pouvez sélectionner le créneau qui vous arrange. Une livraison
                            entièrement écologique et gratuite parce que préserver notre environnement est essentiel.
                            C’est pourquoi nous livrons vos cafés dans des voiturettes La Capsule, 100% électriques !
                            Elles sont écologiques, et n’émettent ni bruit, ni émission de carbone. Et parce que la
                            qualité de votre voisinage compte aussi, nos voiturettes sont bien plus petites que les
                            camions de livraison ordinaires.
                        </p>
                    </div>
                    <div className={styles.wrapperValeurs}>
                        <div className={styles.logoValeurs}>
                            <img src={Grain} alt="" />
                        </div>
                        <p className={styles.titre}>Des grains de café durables sélectionnés avec soin</p>
                        <p>
                            L’éthique est une valeur importante pour Café Toqué. Les grains verts extraits des cerises
                            de café sont sourcés pour leur qualité gustative au juste prix au kilo. Notre objectif est
                            de rémunérer les petits producteurs à la hauteur du travail fourni sur leurs plantations de
                            caféiers pour leur permettre d’en vivre. Avec nous, vous contribuez ainsi à une filière
                            durable du café. En tant que consommateur, vous bénéficiez d’une traçabilité complète pour
                            connaître précisément l’origine du café. Certains cafés sélectionnés sont labellisés
                            durables : café bio, café de forêt, bird friendly…
                        </p>
                    </div>
                    <div className={styles.wrapperValeurs}>
                        <div className={styles.logoValeurs}>
                            <img src={Tasse} alt="" />
                        </div>
                        <p className={styles.titre}>À chaque amateur de café son café torréfié</p>
                        <p>
                            Tous uniques, nous avons chacun notre café artisanal préféré en termes de variété, de saveur
                            et de moment café. Au-delà de nos produits classiques, nous créons rien que pour vous des
                            assemblages personnalisés avec le degré de torréfaction souhaité pour contenter vos papilles
                            ! Commander un café sur mesure, c’est possible chez La Capsule ! Nous répondons à tous vos
                            besoins que ce soit un café espresso, latte ou entièrement personnalisé…
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Valeurs
