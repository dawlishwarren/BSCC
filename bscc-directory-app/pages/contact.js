import React from 'react';
import Layout from '../components/layout/layout';
import styles from '../styles/contact/Contact.module.css';
import headerStyles from '../styles/utils/Headers.module.css';
import PageWithJSbasedForm from '../components/form/js-form';
import { GoLocation } from 'react-icons/go';

const contact = () => {
	return (
		<Layout pageName='Contact'>
			<div className={headerStyles.header}>
				<h1 className={headerStyles.title}>Contact Us</h1>
			</div>
			<div className={styles.grid}>
				<div className={styles.details_container}>
					<div className={styles.address_container}>
						<div className={headerStyles.subheader_container}>
							<h2 className={headerStyles.subheader}>
								<GoLocation /> Postal Address
							</h2>
						</div>
						<h4>
							Budleigh Salterton Chamber of Commerce
							<br />
							C/o 14 Fore Street, <br />
							Budleigh Salterton, <br />
							Devon, EX9 6NG
						</h4>
					</div>
				</div>
				<div>
					<div className={headerStyles.subheader_container}>
						<h2 className={headerStyles.subheader}>Send us a message</h2>
					</div>
					<PageWithJSbasedForm />
				</div>
			</div>
		</Layout>
	);
};

export default contact;
