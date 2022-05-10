import React from 'react';
import Navbar from '../navbar/Navbar';
import styles from '../../styles/Layout.module.css';

const Layout = ({ children }) => {
	return (
		<div className={styles.container}>
			<main>{children}</main>
		</div>
	);
};

export default Layout;
