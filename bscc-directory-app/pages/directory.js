import dbConnect from "../lib/dbConnect";
import Business from "../models/Business";

export default function Directory({ businesses }) {
	return (
		<div>
			<h1>Business Directory</h1>
			{businesses.map((business) => (
				<div key={business._id}>
					<h2>{business.name}</h2>
					<p>{business.bio}</p>
					<h3>Contact:</h3>
					<p>{business.contact.phone}</p>
					<p>{business.contact.website}</p>
					<h3>Address:</h3>
					<p>{business.address.line_1}</p>
					<p>{business.address.line_2}</p>
					<p>{business.address.town}</p>
					<p>{business.address.postcode}</p>
				</div>
			))}
		</div>
	);
}

export async function getServerSideProps(ctx) {
	await dbConnect();

	const result = await Business.find({});
	const businesses = result.map((document) => {
		const business = document.toObject();
		business._id = business._id.toString();
		return business;
	});

	return { props: { businesses: businesses } };
}
