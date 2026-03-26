import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { Message, Likes, Panier, User, Hamburger } from "./Icons";
import { connect } from "react-redux";
import styles from "../assets/styles/components/header.module.css";

function Header({ isLoggedIn }) {
	const [open, setOpen] = useState(false);

	const toggleOpen = () => {
		setOpen(!open);
	};

	return (
		<header className={`${styles.header} ${open && styles.open}`}>
			<div id={styles.logo}>
				<NavLink to="/">
					<Logo
						width="193px"
						height="41px"
						fill="var(--fifthColor)"
						alt="La capsule logo"
					/>
				</NavLink>
			</div>

			<nav className={styles.nav}>
				<div id={styles.menu}>
					<NavLink className={styles.navLink} to="/yourCoffee">
						<p className={styles.menuText}>Confectionne ton café</p>
					</NavLink>
					<NavLink className={styles.navLink} to="/concept">
						<p className={styles.menuText}>Notre concept</p>
					</NavLink>
					<NavLink className={styles.navLink} to="/yourCompositions">
						<p className={styles.menuText}>Vos conceptions</p>
					</NavLink>
				</div>

				<div className={styles.icone}>
					<NavLink className={styles.navLink} to="/contact">
						<Message className={styles.headerImg} />
					</NavLink>
					<NavLink className={styles.navLink} to="/history">
						<Likes className={styles.headerImg} />
					</NavLink>
					<NavLink className={styles.navLink} to="/cart">
						<Panier className={styles.headerImg} />
					</NavLink>
					{isLoggedIn ? (
						<NavLink className={styles.navLink} to="/profil">
							<User className={styles.headerImg} />
						</NavLink>
					) : (
						<NavLink className={styles.navLink} to="/signIn">
							<User className={styles.headerImg} />
						</NavLink>
					)}
				</div>
			</nav>
			<div className={styles.btnHamburger} onClick={toggleOpen}>
				<Hamburger cross={open} />
			</div>
		</header>
	);
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
	};
};

export default connect(mapStateToProps)(Header);
