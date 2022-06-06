// Setup and dependencies
import { useEffect, useState } from 'react';
import dbConnect from '../../lib/dbConnect';
import Business from '../../models/Business';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// Styling and components
import Layout from '../../components/layout/layout';
import Button from '../../components/button/Button';
import styles from '../../styles/Business.module.css';
import buttonStyles from '../../components/button/Button.module.css';
import { BiArrowBack, BiEditAlt } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';

export default function BusinessPage({ business }) {
	const { data: session } = useSession();
	const [sentences, setSentences] = useState([]);
	const router = useRouter();
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
			<div className={buttonStyles.back_button_container}>
				<Button type='back' href='/directory' inner={<BiArrowBack />} />
				<h4 className={buttonStyles.back_button_text}>Back to directory</h4>
			</div>
			<div className={styles.business_container} key={business._id}>
				{/* Name and category */}
				<div className={styles.header}>
					<h1 className={styles.name}>{name}</h1>
					{category && (
						<p className={styles.category}>
							{category[0].toUpperCase() + category.substring(1)}
						</p>
					)}
				</div>
				{/* Content (Bio, Contact, Address) */}
				<div className={styles.content_container}>
					<div className={styles.bio_container}>
						{sentences.map((sentence, index) => {
							return <p key={index}>{sentence}.</p>;
						})}
					</div>
					<div className={styles.contact_container}>
						<h3>Contact:</h3>
						<p>{phone}</p>
						{website ? <p>{website}</p> : <p>No website</p>}
						{email ? <p>{email}</p> : <p>No email</p>}
					</div>
					<div className={styles.address_container}>
						<h3>Address:</h3>
						<p>{line_1}</p>
						<p>{line_2}</p>
						<p>{town}</p>
						<p>{postcode}</p>
					</div>
				</div>
			</div>
			<div className={buttonStyles.buttons_container}>
				{session ? (
					<>
						<Button
							type='edit'
							href='/[id]/edit'
							as={`/${business._id}/edit`}
							inner={<BiEditAlt />}
						/>
						<button
							className={`${[buttonStyles.button]} ${[buttonStyles.delete]}`}
							onClick={handleDelete}>
							<AiOutlineDelete />
						</button>
					</>
				) : (
					<h2>Log in to edit content</h2>
				)}
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
