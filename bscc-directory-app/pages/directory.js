// import clientPromise from '../lib/mongodb';

export default function Directory({ businesses }) {
	const { data } = businesses;
	return (
		<div>
			<h1>Business Directory</h1>
			{data.map((business, index) => {
				const { name, bio, address, contact } = business;
				return (
					<div key={index}>
						<h2>{name}</h2>
						<p>{bio}</p>
						<h2>Address:</h2>
						<p>{address.line_1}</p>
						<p>{address.line_2}</p>
						<p>{address.postcode}</p>
						<p>{address.town}</p>
						<h2>Contact details:</h2>
						<p>{contact.phone}</p>
						<p>{contact.website}</p>
					</div>
				);
			})}
		</div>
	);
}

// 1. Method direct from DB
// export async function getServerSideProps(context) {
// 	const client = await clientPromise;

// 	const db = client.db('business_directory');

// 	let businesses = await db
// 		.collection('businesses')
// 		.find({})
// 		.limit(20)
// 		.toArray();
// 	businesses = JSON.parse(JSON.stringify(businesses));

// 	return {
// 		props: { businesses },
// 	};
// }

// 2. Method using API Route for CRUD functionality
export async function getServerSideProps(context) {
	let res = await fetch('http://localhost:3000/api/businesses', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	let businesses = await res.json();

	return {
		props: { businesses },
	};
}
