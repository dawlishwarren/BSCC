import React from 'react';
import Layout from '../components/layout/layout';
import styles from '../styles/Contact.module.css';
import PageWithJSbasedForm from './js-form';

const contact = () => {
	return (
		<Layout pageName='Contact'>
			<div className={styles.details_container}>
				<div className={styles.address_container}>Address</div>
			</div>
			<PageWithJSbasedForm />
		</Layout>
	);
};

export default contact;
