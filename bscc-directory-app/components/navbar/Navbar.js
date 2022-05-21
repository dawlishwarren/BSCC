import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Navbar.module.css';
import Login from '../auth/Login';

const Navbar = ({ home, pageName }) => {
	// Determine navbar state based on props before mounting
	useEffect(() => {
		beforeHydration();
		return () => {
			setNavigationState({ currentPage: '', navItems: [] });
			setNavbar(true);
		};
	}, []);
	const beforeHydration = () => {
		window.addEventListener('scroll', changeBackground);
		hideCurrentPageName(pageName);
	};
	const [navbar, setNavbar] = useState(true);
	const [navigationState, setNavigationState] = useState({
		currentPage: '',
		navItems: [],
	});

	// Change background opacity based on scroll value
	const changeBackground = () => {
		if (window.scrollY <= 80) setNavbar(true);
		else setNavbar(false);
	};
	// Hide the current page on the navigation menu
	const navItems = [
		{ name: 'Home', path: '/' },
		{ name: 'Directory', path: '/directory' },
		{ name: 'About', path: '/#about' },
		{ name: 'Membership', path: '/#membership' },
		{ name: 'Contact', path: '/contact' },
	];
	function hideCurrentPageName(pn) {
		const filtered = navItems.filter((navItem) => navItem.name != pn);
		setNavigationState({
			...navigationState,
			currentPage: pn,
			navItems: filtered,
		});
	}

	// Return a navbar dependent on home or inner page value
	return (
		<>
			{home ? (
				<div
					className={`${[styles.navbar_home]} ${[
						navbar ? styles.transparent : styles.opaque,
					]}`}>
					<div className={styles.logo}>Logo</div>
					<div className={styles.links}>
						{navigationState.navItems.map((item, index) => {
							return (
								<Link href={item.path} key={index}>
									<li className={styles.link_item}>{item.name}</li>
								</Link>
							);
						})}
						<Login />
					</div>
				</div>
			) : (
				<div className={styles.navbar_inner}>
					<div className={styles.logo}>Logo</div>
					<div className={styles.links}>
						{navigationState.navItems.map((item, index) => {
							return (
								<Link href={item.path} key={index}>
									<li className={styles.link_item}>{item.name}</li>
								</Link>
							);
						})}
						<Login />
					</div>
				</div>
			)}
		</>
	);
};

export default Navbar;
