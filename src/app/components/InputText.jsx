import React from "react";
import styles from "../assets/styles/components/inputText.module.css";

const containerStyle = { display: "inline-block", position: "relative" };

/**
 * InputText component that allows users to input text values.
 * @param {Object} props - The component props.
 * @param {number|string} props.value - The current value of the input.
 * @param {Function} props.setValue - Callback function to update the value.
 * @param {Function} props.validation - Callback function to process the value when blur.
 * @param {string|React.ReactNode} [props.suffix] - An optional suffix to display inside the input.
 * @returns {JSX.Element} A React JSX element representing the InputNumber component.
 */
function InputText({
	value,
	setValue,
	width = "auto",
	validation = false,
	suffix,
}) {
	const onchange = (event) => {
		setValue(event.target.value);
	};

	const onblur = (event) => {
		if (validation) setValue(validation(event.target.value));
	};

	return (
		<div style={{ ...containerStyle, width: width }}>
			<input
				className={styles.inputText}
				type="text"
				value={value}
				onChange={onchange}
				onBlur={onblur}
			/>
			{suffix ? <div className={styles.inputTextSuffix}>{suffix}</div> : null}
		</div>
	);
}

export default InputText;
