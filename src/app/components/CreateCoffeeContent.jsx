import React from 'react'
import styles from '../assets/styles/components/createcoffeecontent.module.css';
import tableCoffee_webp from "../assets/images/cafestable-1.webp";
import tableCoffee_15_webp from "../assets/images/cafestable-1@1.5x.webp";
import tableCoffee_png from "../assets/images/cafestable-1.png";
import tableCoffee_15_png from "../assets/images/cafestable-1@1.5x.png";
import persoCafe_webp from "../assets/images/persocafe-1.webp";
import persoCafe_2_webp from "../assets/images/persocafe-1@2x.webp";
import persoCafe_png from "../assets/images/persocafe-1.png";
import persoCafe_2_png from "../assets/images/persocafe-1@2x.png";
import decor from "../assets/images/img-decor-conception.png";
import cafe from "../assets/images/img-cafe-conception.png";

const CreateCoffeeContent = () => {
    return (
        <div>
            <div className={styles.titleH1}>
                <h1>Bienvenue chez La Caspule,</h1>
                <h3 className={styles.titleH3}>Confectionne ton café</h3>
            </div>

            <div className={styles.wrapper1}>
                <div className={styles.container}>
                    <div className={styles.thumbNail}>
                        <img src={decor} alt="decoration" />
                    </div>
                    <div className={styles.paragraphes}>
                        <p>
                            Chez La Capsule, nous croyons que chaque tasse de café devrait être une expérience
                            sensorielle inoubliable, adaptée exactement à vos goûts et préférences individuelles. C'est
                            pourquoi nous vous offrons un pouvoir sans précédent pour créer VOTRE café parfait.
                        </p>
                    </div>
                </div>

                <div className={styles.container}>
                    <div className={styles.paragraphes}>
                        <h2 className={styles.titleAdjust}>Concevoir son café</h2>
                        <p>
                            Votre destination ultime pour une expérience de café unique et sur mesure ! Nous sommes une
                            entreprise spécialisée dans la personnalisation de café, avec une touche écologique,
                            proposant une livraison gratuite à la fois rapide et respectueuse de l'environnement grâce à
                            notre flotte entièrement électrique.
                        </p>
                    </div>

                    <div className={styles.cafeimg}>
                        <img
                            src={persoCafe_png}
                            srcSet={`
                                ${persoCafe_webp} 1x,
                                ${persoCafe_2_webp} 2x,
                                ${persoCafe_png} 1x,
                                ${persoCafe_2_png} 2x
                            `}
                            alt="personalCoffee"
                        />
                    </div>
                </div>
            </div>

            <div className={styles.wrapper2}>
                <div className={`${styles.container} ${styles.cafe}`}>
                    <img src={cafe} alt="" />
                </div>
                <div className={styles.container}>
                    <div className={styles.paragraphes}>
                        <h2 className={styles.titleAdjust}>Personnaliser son café</h2>
                        <p>
                            Voici comment cela fonctionne : Choisissez votre base : Commencez par sélectionner le type
                            de lait de votre choix parmi une gamme de délicieuses options : lait d'amande crémeux, lait
                            de noix de coco rafraîchissant, ou peut-être préférez-vous le classique lait de vache ?
                            Contrôlez votre énergie : Pour les amateurs de caféine, nous vous permettons de régler le
                            taux de caféine de votre café. Choisissez parmi une variété d'options, des shots intenses
                            pour les journées chargées, aux versions décaféinées pour un moment de détente. Taille et
                            générosité : Que vous ayez besoin d'un petit coup de pouce ou d'une grande dose de caféine,
                            nous avons des tailles pour tous les appétits. Personnalisez la taille de votre café selon
                            vos besoins. Toppings et extras : Vous avez un penchant pour l'aventure gustative ? Ajoutez
                            une touche supplémentaire à votre café avec nos délicieux toppings : crème fouettée
                            onctueuse, pépites de chocolat savoureuses, ou encore une pincée de cannelle épicée.
                            Choisissez votre variété de café : Du café arabica doux et raffiné au café robusta corsé,
                            nous entendons une gamme de variétés de café pour satisfaire tous les palais. Une touche
                            finale personnalisée : Notre service ne s'arrête pas au contenu de votre tasse.
                            Personnalisez l'apparence de votre café en tenant compte de la décoration qui vous inspire :
                            motifs créatifs, messages affectueux ou tout simplement votre nom, tout est possible pour
                            rendre votre café unique.
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.wrapper2}>
                <div className={styles.container}>
                    <p className={styles.paragraphes}>
                        Chez La Capsule, nous croyons que chaque tasse de café raconte une histoire unique, et nous
                        sommes ravis de faire partie de la vôtre. Rejoignez-nous dans cette aventure caféinée et
                        découvrez l'harmonie parfaite entre personnalisation, qualité et durabilité. Commandez dès
                        maintenant et offrez-vous une expérience café exceptionnelle, conçue spécialement pour vous,
                        livrée avec soin et respect pour l'environnement. La Capsule - votre café, votre histoire.
                    </p>
                </div>

                <div className={styles.container}>
                    <img
                        className={styles.tableCoffe}
                        src={tableCoffee_png}
                        srcSet={`
                            ${tableCoffee_webp} 1x,
                            ${tableCoffee_15_webp} 1.5x,
                            ${tableCoffee_png} 1x,
                            ${tableCoffee_15_png} 1.5x
                        `}
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}

export default CreateCoffeeContent