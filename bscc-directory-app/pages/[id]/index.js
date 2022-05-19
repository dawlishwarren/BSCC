import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import dbConnect from '../../lib/dbConnect';
import Business from '../../models/Business';
import Layout from '../../components/layout/layout';
import styles from '../../styles/Business.module.css';

export default function BusinessPage({ business }) {
	const router = useRouter();
	const [sentences, setSentences] = useState([]);
	const [message, setMessage] = useState('');
	const handleDelete = async () => {
		const businessID = router.query.id;

		try {
			await fetch(`/api/businesses/${businessID}`, { method: 'Delete' });
			router.push('/directory');
		} catch (err) {
			setMessage('Failed to delete the business, please check the console');
		}
	};
	// Prop destructuring
	const {
		name,
		bio,
		contact: { phone, website, email },
		address: { line_1, line_2, town, postcode },
		category,
	} = business;

	function bioToParagraph() {
		let split = bio.split('.');
		setSentences(split);
	}
	useEffect(() => {
		bioToParagraph();
		return () => {
			setSentences([]);
		};
	}, []);

	// JSX
	return (
		<Layout>
			<div className={styles.business_container} key={business._id}>
				<div className={styles.header}>
					<h1 className={styles.name}>{name}</h1>
					{category ? (
						<p className={styles.category}>
							({category[0].toUpperCase() + category.substring(1)})
						</p>
					) : (
						<p></p>
					)}
				</div>
				<div className={styles.bio_container}>
					{sentences.map((sentence) => {
						return <p>{sentence}.</p>;
					})}
				</div>
				<h3>Contact:</h3>
				<p>{phone}</p>
				<p>{website}</p>
				{/* Form check */}
				{email ? <p>{email}</p> : <p>No email</p>}
				<h3>Address:</h3>
				<p>{line_1}</p>
				<p>{line_2}</p>
				<p>{town}</p>
				<p>{postcode}</p>
			</div>
			<div>
				<Link href='/[id]/edit' as={`/${business._id}/edit`}>
					<button>Edit</button>
				</Link>
				<button onClick={handleDelete}>Delete</button>
			</div>
		</Layout>
	);
}

export async function getServerSideProps({ params }) {
	await dbConnect();
	const business = await Business.findById(params.id).lean();
	business._id = business._id.toString();

	return { props: { business } };
}
