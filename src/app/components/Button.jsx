import React, { useState, useEffect } from "react";
import styles from "../assets/styles/components/button.module.css";

const BREAKPOINT = 600;
const SMALL_SCREEN_FONT_SIZE = '18px';

const Button = ({
	children,
	width,
	height,
	outline = false,
	textColor = outline ? "var(--secondaryColor)" : 'var(--fifthColor)',
	backgroundColor = outline ? textColor : "var(--secondaryColor)",
	padding = "0.6em 3em",
	margin,
	type,
	onClick,
	fontSize = "24px",
	disabled = false,
}) => {
	const isSmallScreen = () => window.innerWidth < BREAKPOINT;
	const [smallScreen, setSmallScreen] = useState(isSmallScreen());
	const renderedFontSize = smallScreen ? SMALL_SCREEN_FONT_SIZE : fontSize;

	const buttonStyle = {
    width: width,
    height: height,
    padding: padding,
    margin: margin,
    border: `3px solid ${outline ? textColor : backgroundColor}`,
    color: textColor,
    background: outline ? 'transparent' : backgroundColor,
    fontFamily: 'var(--font-family)',
    fontSize: renderedFontSize,
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    textAlign: 'center', 
  };

	const updateSmallScreen = () => {
		setSmallScreen(isSmallScreen());
	};

	useEffect(() => {
		window.addEventListener('resize', updateSmallScreen);

		return () => {
			window.removeEventListener('resize', updateSmallScreen);
		}
	}, [smallScreen])

	return (
		<button
			className={styles.button}
			type={type}
			style={buttonStyle}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
