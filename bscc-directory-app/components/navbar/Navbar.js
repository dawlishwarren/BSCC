import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Navbar.module.css';

const Navbar = () => {
	const [navbar, setNavbar] = useState(false);

	const changeBackground = () => {
		if (window.scrollY <= 80) setNavbar(true);
		else setNavbar(false);
	};
	const navItems = [
		{ name: 'Home', path: '/' },
		{ name: 'Directory', path: '/directory' },
		{ name: 'About', path: '/#about' },
		{ name: 'Membership', path: '/#membership' },
		{ name: 'Contact', path: '/contact' },
	];

	useEffect(() => {
		window.addEventListener('scroll', changeBackground);
	}, []);
	return (
		<div
			className={`${[styles.navbar]} ${[
				navbar ? styles.transparent : styles.opaque,
			]}`}>
			<div className={styles.logo}>Logo</div>
			<div className={styles.links}>
				{navItems.map((item, index) => {
					return (
						<Link href={item.path} key={index}>
							<li className={styles.link_item}>{item.name}</li>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Navbar;
