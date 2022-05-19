import React from 'react';
import Navbar from '../navbar/Navbar';
import styles from '../../styles/Layout.module.css';

const Layout = ({ children, home, pageName }) => {
	// Generate navbar and styling based on home or inner page
	return (
		<>
			{home ? <Navbar home /> : <Navbar home={false} pageName={pageName} />}
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
