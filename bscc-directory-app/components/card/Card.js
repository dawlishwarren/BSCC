import React from 'react';
import Link from 'next/link';
import styles from '../../styles/Card.module.css';

const Card = ({ business }) => {
	return (
		<div className={styles.card}>
			<h5 className={styles.business_name}>{business.name}</h5>
			<div className={styles.buttons}>
				<h3>See Page:</h3>
				<Link href='/[id]' as={`/${business._id}`}>
					<button>View</button>
				</Link>
				{/* Edit */}
				<h3>Edit Content:</h3>
				<Link href='/[id]/edit' as={`/${business._id}/edit`}>
					<button>Edit</button>
				</Link>
			</div>
		</div>
	);
};

export default Card;
