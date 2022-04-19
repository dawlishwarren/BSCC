import dbConnect from "../../lib/dbConnect";
import Business from "../../models/Business";
import Navbar from "../../components/navbar/Navbar";

export default function BusinessPage({ business }) {
	const {
		name,
		bio,
		contact: { phone, website },
		address: { line_1, line_2, town, postcode },
	} = business;
	return (
		<>
			<div key={business._id}>
				<h1>{name}</h1>
				<p>{bio}</p>
				<h3>Contact:</h3>
				<p>{phone}</p>
				<p>{website}</p>
				<h3>Address:</h3>
				<p>{line_1}</p>
				<p>{line_2}</p>
				<p>{town}</p>
				<p>{postcode}</p>
			</div>
		</>
	);
}

export async function getServerSideProps({ params }) {
	await dbConnect();
	const business = await Business.findById(params.id).lean();
	business._id = business._id.toString();

	return { props: { business } };
}
