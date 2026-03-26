import React from "react";
import { formatNumber } from "../utils/functions";
import style from "../assets/styles/components/inputNumber.module.css";

const containerStyle = {
	width: '90px',
	display: "inline-block",
	position: "relative",
};

/**
 * InputNumber component that allows users to input numeric values.
 * @param {Object} props - The component props.
 * @param {number|string} props.value - The current value of the input.
 * @param {Function} props.setValue - Callback function to update the value.
 * @param {number|false} [props.min=false] - The minimum allowed value (false = no minimum).
 * @param {number|false} [props.max=false] - The maximum allowed value (false = no maximum).
 * @param {number} [props.step=1] - The step value for incrementing/decrementing the numeric value.
 * @param {string|React.ReactNode} [props.suffix] - An optional suffix to display inside the input after the numeric value.
 * @returns {JSX.Element} A React JSX element representing the InputNumber component.
 */
function InputNumber({
	value,
	setValue,
	min = false,
	max = false,
	step = 1,
	precision = 2,
	suffix,
}) {
	const onchange = (event) => setValue(event.target.value);

	const onblur = (event) => {
		const value = string2number(event.target.value);
		setValue(format(value));
	};

	const onkeydown = (event) => {
		const key = event.key;

		if (key === "ArrowUp") {
			increment();
		} else if (key === "ArrowDown") {
			decrement();
		} else if (key === "Enter") {
			event.target.blur();
		}
	};

	const format = (n) => {
		if (min !== false) n = n < min ? min : n;
		if (max !== false) n = n > max ? max : n;

		return formatNumber(n, precision);
	};

	const string2number = (str) => {
		str = str.replace(",", ".");
		return parseFloat(value);
	};

	const increment = () => {
		const newValue = parseFloat(value) + step;
		setValue(format(newValue, precision));
	}

	const decrement = () => {
		const newValue = parseFloat(value) - step;
		setValue(format(newValue, precision));
	}

	return (
		<div style={containerStyle}>
			<input
				className={style.inputNumber}
				type="text"
				value={value}
				role="spinbutton"
				onChange={onchange}
				onBlur={onblur}
				onKeyDown={onkeydown}
			/>
			{suffix ? <div className={style.suffix}>{suffix}</div> : null}
			<div className={style.buttons}>
				<div className={style.buttonUp} onClick={increment}></div>
				<div className={style.buttonDown} onClick={decrement}></div>
			</div>
		</div>
	);
}

export default InputNumber;
