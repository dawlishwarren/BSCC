import React from 'react';
import Link from 'next/link';
import styles from '../../styles/Card.module.css';

const Card = ({ business }) => {
	function bioCharacterLimit() {
		if (business.bio.length > 150) return '...';
		else return '';
	}

	const {
		name,
		address: { town },
		category,
		bio,
	} = business;
	return (
		<div className={styles.card}>
			<div className={styles.card_content}>
				<h2 className={styles.business_name}>{name}</h2>
				<h5 className={styles.business_town}>{town}</h5>
				<h5 className={styles.business_category}>
					{category && `(${category[0].toUpperCase() + category.substring(1)})`}
				</h5>
				<p className={styles.bio}>
					{bio && `${bio.slice(0, 150)}${bioCharacterLimit()}`}
				</p>
			</div>
			<div className={styles.buttons}>
				<Link href='/[id]' as={`/${business._id}`}>
					<button className={styles.button}>View Business</button>
				</Link>
			</div>
		</div>
	);
};

export default Card;
