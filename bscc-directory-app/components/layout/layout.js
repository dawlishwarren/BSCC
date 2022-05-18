import React from 'react';
import Navbar from '../navbar/Navbar';
import styles from '../../styles/Layout.module.css';

const Layout = ({ children, home }) => {
	return (
		<>
			{home ? <Navbar home /> : <Navbar />}
			{!home ? (
				<div className={styles.container}>
					<main>{children}</main>
				</div>
			) : (
				<main>{children}</main>
			)}
		</>
	);
};

export default Layout;
