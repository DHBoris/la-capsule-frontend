import React, { useState, useEffect } from "react";
import styles from "../assets/styles/components/carrousel.module.css";

import { ReactComponent as Arrow } from "../assets/images/anchor.svg";

const Carrousel = ({ images, delay = 5000 }) => {
	const [imageIndex, setImageIndex] = useState(1);
	const marginLeft = (imageIndex - 1) * -100 + "%";

	function next() {
		let newIndex = imageIndex + 1;
		setImageIndex(newIndex > images.length ? 1 : newIndex);
	}

	function previous() {
		let newIndex = imageIndex - 1;
		setImageIndex(newIndex < 1 ? images.length : newIndex);
	}

	function handleKeyDown(e) {
		const key = e.key;

		if (key === "ArrowRight") next();
		else if (key === "ArrowLeft") previous();
	}

	useEffect(() => {
		const interval = setInterval(() => {
			next();
		}, delay);

		return () => {
			clearInterval(interval);
		};
	}, [imageIndex]);

	const Bullets = [];

	for (let i = 0; i < images.length; i++) {
		const selected = imageIndex === i + 1;

		Bullets.push(
			<div
				key={i}
				className={`${styles.bullet} ${selected && styles.selected}`}
				onClick={() => setImageIndex(i + 1)}
			></div>
		);
	}

	return (
		<div className={styles.carrousel} tabIndex={0} onKeyDown={handleKeyDown}>
			{images.length > 1 ? (
				<React.Fragment>
					<div className={styles.images} style={{ marginLeft: marginLeft }}>
						{images.map((url, index) => (
							<img src={url} key={`image-${index}`} />
						))}
					</div>
					<Arrow className={styles.arrowLeft} onClick={previous} />
					<Arrow className={styles.arrowRight} onClick={next} />
					<div className={styles.paging}>{Bullets}</div>
				</React.Fragment>
			) : null}
		</div>
	);
};

export default Carrousel;
