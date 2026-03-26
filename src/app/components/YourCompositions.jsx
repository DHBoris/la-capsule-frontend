import React from "react";
import { useState } from "react";
import imageMagnify from "../assets/images/search.svg";
import imageFilter from "../assets/images/filter.svg";
import image1 from "../assets/images/compositions1.png";
import image2 from "../assets/images/compositions2.png";
import image3 from "../assets/images/compositions3.png";
import image4 from "../assets/images/compositions4.png";
import image5 from "../assets/images/compositions5.png";
import image6 from "../assets/images/compositions6.png";
import image7 from "../assets/images/compositions7.png";
import image8 from "../assets/images/compositions8.png";
import image9 from "../assets/images/compositions9.png";
import InputText from "./InputText";
import Checkbox from "./Checkbox";
import styles from "../assets/styles/components/yourCompositions.module.css";

const mockedData = [
	{ image: image1, tags: ["Avec mousse de lait", "Robusta", "Vegan"] },
	{ image: image2, tags: ["Avec mousse de lait", "Arabica", "Animal"] },
	{ image: image3, tags: ["Arabica", "Animal"] },
	{ image: image4, tags: ["Avec topping", "Arabica", "Animal"] },
	{ image: image5, tags: ["Avec mousse de lait", "Robusta", "Vegan"] },
	{ image: image6, tags: ["Avec mousse de lait", "Robusta", "Animal"] },
	{
		image: image7,
		tags: ["Avec topping", "Avec mousse de lait", "Robusta", "Animal"],
	},
	{ image: image8, tags: ["Avec topping", "Robusta", "Vegan"] },
	{ image: image9, tags: ["Avec mousse de lait", "Robusta", "Vegan"] },
];

const filtersList = [
	"Avec topping",
	"Avec mousse de lait",
	"Arabica",
	"Robusta",
	"Assemblage",
	"Animal",
	"Végan",
];

const initialState = () => {
	let state = {};

	for (const filter of filtersList) {
		state[filter] = false;
	}

	return state;
};

const Magnify = () => (
	<div
		className={styles.magnify}
		style={{
			backgroundImage: `url(${imageMagnify})`,
		}}
	></div>
);

const ArrowDown = () => <div className={styles.arrowDown}></div>;

const YourCompositions = () => {
	const [search, setSearch] = useState("");
	const [filters, setFilters] = useState(initialState);

	const activeTags = Object.keys(filters).filter((tag) => filters[tag]);
	let filteredResults = [];

	if (activeTags.length) {
		/* Si une ou plusieurs checkbox sont cochées, alors on filtre les resultats */
		for (const coffee of mockedData) {
			let match = true;

			/* On vérifie que chaque tags cochées sont inclus dans l'objet coffee */
			for (const tag of activeTags) {
				if (coffee.tags.includes(tag) === false) {
					match = false;
					break;
				}
			}

			if (match) filteredResults.push(coffee);
		}
	} else {
		filteredResults = mockedData;
	}

	const toggleFilter = (filter) =>
		setFilters((previous) => {
			let newState = { ...previous };
			newState[filter] = !newState[filter];
			return newState;
		});

	return (
		<section className={styles.yourCompositions}>
			<h2 className={styles.compositionH2}>Vos compositions</h2>
			<InputText
				width={350}
				value={search}
				setValue={setSearch}
				suffix={Magnify()}
			/>
			<div className={styles.filters}>
				<div src={imageFilter} className={styles.filter} alt="filter"></div>
				<div className={styles.labels}>
					{filtersList.map((filter, index) => (
						<Checkbox
							key={index}
							value={filter}
							checked={filters[filter]}
							onchange={(e) => toggleFilter(e.target.value)}
						>
							{filter}
						</Checkbox>
					))}
				</div>
			</div>

			<div className={styles.table}>
				{filteredResults.map((coffee, index) => (
					<div
						key={index}
						className={styles.tableItem}
						style={{ backgroundImage: `url(${coffee.image})` }}
					>
						<div className={styles.heart}></div>
					</div>
				))}
			</div>

			<ArrowDown />
		</section>
	);
};

export default YourCompositions;
