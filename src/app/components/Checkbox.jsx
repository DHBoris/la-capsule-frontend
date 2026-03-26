import React from "react";
import styles from "../assets/styles/components/checkbox.module.css";

const CustomBox = () => (
	<div className={styles.customBox}>
		<svg
			width="100%"
			height="100%"
			viewBox="0 1 84 84"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M17.135,41.901l16.198,16.198l32.865,-32.865"
				fill="none"
				stroke="#000"
				strokeWidth="8.47"
			/>
		</svg>
	</div>
);

/**
 * Custom Checkbox component.
 * @param {Object} props - The properties of the Checkbox component.
 * @param {boolean} props.checked - Indicates whether the checkbox is checked or not.
 * @param {function} props.onchange - Callback function called when the checkbox state changes.
 * @param {string} props.name - The name of the checkbox input.
 * @param {string} props.value - The value of the checkbox input.
 * @param {React.ReactNode} props.children - The children elements to be displayed next to the custom checkbox.
 * @returns {JSX.Element} A <label> element with a custom checkbox, text, and the children elements.
 */
function Checkbox({ checked, onchange, name, value, children }) {
	return (
		<label
			className={styles.checkbox}
			tabIndex={0}
			onKeyDown={(event) => {
				const key = event.key;
				const input = event.target.querySelector("input");

				if (key !== "Tab") event.preventDefault();
				if (key === " " || key === "Enter") input.click();
			}}
		>
			<input
				className={styles.checkboxInput}
				type="checkbox"
				name={name}
				value={value}
				checked={checked}
				onChange={onchange}
			/>
			<CustomBox />
			{children}
		</label>
	);
}

export default Checkbox;
