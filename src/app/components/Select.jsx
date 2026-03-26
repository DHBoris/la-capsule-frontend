import React, { useState, useEffect } from "react";
import styles from "../assets/styles/components/select.module.css";

export const Select = ({
	children,
	placeholder = "",
	width = "auto",
	value,
	setValue,
}) => {
	const [open, setOpen] = useState(false);
	const [text, setText] = useState(placeholder);
	const [suffix, setSuffix] = useState("");

	const toggleOpen = () => {
		setOpen(!open);
	};

	const changeValue = (e) => {
		const target = e.currentTarget;
		const textNode = target.childNodes[0];
		const suffixNode = target.childNodes[1];

		setText(textNode.nodeValue);
		setValue(target.dataset.value);
		setOpen(false);
		setSuffix(suffixNode ? suffixNode.innerHTML : "");
	};

	useEffect(() => {
		if (!open) return;

		document.addEventListener("click", toggleOpen);

		return () => {
			document.removeEventListener("click", toggleOpen);
		};
	}, [open]);

	return (
		<div className={styles.container}>
			<div
				className={`${styles.select} ${open && styles.open}`}
				style={{ width: width }}
				tabIndex={0}
				data-value={value}
				onClick={toggleOpen}
			>
				{text}
				{suffix && <div className={styles.suffix}>{suffix}</div>}
				<div className={styles.arrow}></div>
			</div>
			{open && (
				<Options>
					{children.map((option, index) => (
						<Option
							key={index}
							value={
								option.props.value ? option.props.value : option.props.children
							}
							suffix={option.props.suffix ? option.props.suffix : ""}
							onClick={changeValue}
						>
							{option.props.children}
						</Option>
					))}
				</Options>
			)}
		</div>
	);
};

const Options = ({ children }) => {
	return <div className={styles.options}>{children}</div>;
};

export const Option = ({
	children,
	value,
	suffix,
	selected = false,
	onClick,
}) => {
	return (
		<div
			className={`${styles.option} ${selected ? styles.selected : ""}`}
			data-value={value}
			onClick={onClick}
		>
			{children}
			{suffix ? <div className={styles.suffix}>{suffix}</div> : null}
		</div>
	);
};


// import React, { useState, useEffect } from 'react';
// import styles from '../assets/styles/components/select.module.css';

// const Select = ({ children, placeholder = '', width = 'auto', value, setValue }) => {
//     const [open, setOpen] = useState(false);
//     const [text, setText] = useState(placeholder);
//     const [suffix, setSuffix] = useState('');

//     const toggleOpen = () => {
//         setOpen(!open);
//     };

//     const changeValue = (option) => {
//         const { value: optionValue, suffix: optionSuffix } = option;
//         const newSuffix = optionSuffix || '';
//         setText(optionValue);
//         setValue(optionValue);
//         setOpen(false);
//         setSuffix(newSuffix);
//     };

//     useEffect(() => {
//         const handleClick = (e) => {
//             if (!open) return;

//             if (e.target.closest(`.${styles.select}`)) {
//                 // Click occurred inside the select, do nothing
//                 return;
//             }

//             // Click occurred outside the select, close the options
//             toggleOpen();
//         };

//         document.addEventListener('click', handleClick);

//         return () => {
//             document.removeEventListener('click', handleClick);
//         };
//     }, [open]);

//     return (
//         <div className={styles.container}>
//             <div
//                 className={`${styles.select} ${open ? styles.open : ''}`}
//                 style={{ width: width }}
//                 tabIndex={0}
//                 data-value={value}
//                 onClick={toggleOpen}
//             >
//                 {text}
//                 {suffix && <div className={styles.suffix}>{suffix}</div>}
//                 <div className={styles.arrow}></div>
//             </div>
//             {open && <Options changeValue={changeValue}>{children}</Options>}
//         </div>
//     );
// };

// const Options = ({ changeValue, children }) => {
//     return <div className={styles.options}>{children}</div>;
// };

// const Option = ({ children, value, suffix, onClick }) => {
//     const handleClick = () => {
//         onClick({ value, suffix });
//     };

//     return (
//         <div className={styles.option} onClick={handleClick}>
//             {children}
//             {suffix && <div className={styles.suffix}>{suffix}</div>}
//         </div>
//     );
// };

// export { Select, Option };