import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

// Button that takes in type and href as prop and returns styled button with link.
// Create a stylesheet based on type
// Implement on directory and [id].index

const Button = ({ type, href, as, inner }) => {
	function determineType() {
		switch (type) {
			case 'add':
				return `${[styles.button]} ${[styles.add]}`;
			case 'back':
				return `${[styles.button]} ${[styles.back]}`;
			case 'edit':
				return `${[styles.button]} ${[styles.edit]}`;
			case 'delete':
				return `${[styles.button]} ${[styles.delete]}`;
		}
	}
	return (
		<Link href={href} as={as}>
			<button className={determineType()}>{inner}</button>
		</Link>
	);
};

export default Button;
