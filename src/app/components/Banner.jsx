import React from "react";
import Button from "./Button";
import { Parallax, Layer } from "./Parallax";
import styles from "../assets/styles/components/banner.module.css";

import cup_webp from "../assets/images/banniere/cup.webp";
import cup_2x_webp from "../assets/images/banniere/cup@2x.webp";
import cup_png from "../assets/images/banniere/cup.png";
import cup_2x_png from "../assets/images/banniere/cup@2x.png";
import goutte_1_2x_webp from "../assets/images/banniere/goutte_1@2x.webp";
import goutte_1_webp from "../assets/images/banniere/goutte_1.webp";
import goutte_1_2x_png from "../assets/images/banniere/goutte_1@2x.png";
import goutte_1_png from "../assets/images/banniere/goutte_1.png";
import goutte_2_2x_webp from "../assets/images/banniere/goutte_2@2x.webp";
import goutte_2_webp from "../assets/images/banniere/goutte_2.webp";
import goutte_2_2x_png from "../assets/images/banniere/goutte_2@2x.png";
import goutte_2_png from "../assets/images/banniere/goutte_2.png";
import goutte_3_2x_webp from "../assets/images/banniere/goutte_3@2x.webp";
import goutte_3_webp from "../assets/images/banniere/goutte_3.webp";
import goutte_3_2x_png from "../assets/images/banniere/goutte_3@2x.png";
import goutte_3_png from "../assets/images/banniere/goutte_3.png";
import goutte_4_webp from "../assets/images/banniere/goutte_4.webp";
import goutte_4_075x_webp from "../assets/images/banniere/goutte_4@0.75x.webp";
import goutte_4_png from "../assets/images/banniere/goutte_4.png";
import goutte_4_075x_png from "../assets/images/banniere/goutte_4@0.75x.png";
import graines_1_2x_webp from "../assets/images/banniere/graines_1@2x.webp";
import graines_1_webp from "../assets/images/banniere/graines_1.webp";
import graines_1_2x_png from "../assets/images/banniere/graines_1@2x.png";
import graines_1_png from "../assets/images/banniere/graines_1.png";
import graines_2_webp from "../assets/images/banniere/graines_2.webp";
import graines_2_05x_webp from "../assets/images/banniere/graines_2@0.5x.webp";
import graines_2_png from "../assets/images/banniere/graines_2.png";
import graines_2_05x_png from "../assets/images/banniere/graines_2@0.5x.png";
import graines_3_webp from "../assets/images/banniere/graines_3.webp";
import graines_3_05x_webp from "../assets/images/banniere/graines_3@0.5x.webp";
import graines_3_png from "../assets/images/banniere/graines_3.png";
import graines_3_05x_png from "../assets/images/banniere/graines_3@0.5x.png";


const cupImages = `
	url(${cup_2x_webp}) 2x type("image/webp"),
	url(${cup_webp}) 1x type("image/webp"),
	url(${cup_2x_png}) 2x,
	url(${cup_png}) 1x
`;

const graines1Images = `
	url(${graines_1_2x_webp}) 2x type("image/webp"),
	url(${graines_1_webp}) 1x type("image/webp"),
	url(${graines_1_2x_png}) 2x,
	url(${graines_1_png}) 1x
`;

const graines2Images = `
	url(${graines_2_webp}) 2x type("image/webp"),
	url(${graines_2_05x_webp}) 1x type("image/webp"),
	url(${graines_2_png}) 2x,
	url(${graines_2_05x_png}) 1x
`;

const graines3Images = `
	url(${graines_3_webp}) 2x type("image/webp"),
	url(${graines_3_05x_webp}) 1x type("image/webp"),
	url(${graines_3_png}) 2x,
	url(${graines_3_05x_png}) 1x
`;

const goutte1Images = `
	url(${goutte_1_2x_webp}) 2x type("image/webp"),
	url(${goutte_1_webp}) 1x type("image/webp"),
	url(${goutte_1_2x_png}) 2x,
	url(${goutte_1_png}) 1x
`;

const goutte2Images = `
	url(${goutte_2_2x_webp}) 2x type("image/webp"),
	url(${goutte_2_webp}) 1x type("image/webp"),
	url(${goutte_2_2x_png}) 2x,
	url(${goutte_2_png}) 1x
`;

const goutte3Images = `
	url(${goutte_3_2x_webp}) 2x type("image/webp"),
	url(${goutte_3_webp}) 1x type("image/webp"),
	url(${goutte_3_2x_png}) 2x,
	url(${goutte_3_png}) 1x
`;

const goutte4Images = `
	url(${goutte_4_webp}) 2x type("image/webp"),
	url(${goutte_4_075x_webp}) 1x type("image/webp"),
	url(${goutte_4_png}) 2x,
	url(${goutte_4_075x_png}) 1x
`;


const Banner = () => {
	return (
		<div className={styles.banner}>
			<Parallax sensitivityX={1} sensitivityY={0.2}>
				<Layer imageSet={graines3Images} sensitivity={20} />
				<Layer imageSet={goutte4Images} sensitivity={30} />
				<Layer imageSet={cupImages} sensitivity={50} />
				<Layer imageSet={goutte2Images} sensitivity={85} />
				<Layer imageSet={goutte1Images} sensitivity={100} />
				<Layer imageSet={goutte3Images} sensitivity={125} />
				<Layer imageSet={graines2Images} sensitivity={130} />
				<Layer imageSet={graines1Images} sensitivity={160} />
			</Parallax>
			<div className={styles.contentBanner}>
				<h1>
					<p className={styles.typo1}>
						Personnalisez votre <span className={styles.typo2}>Café</span>
					</p>
					<p className={styles.typo3}>livré à domicile</p>
				</h1>
				<Button>Nos produits</Button>
			</div>
		</div>
	);
};

export default Banner;
