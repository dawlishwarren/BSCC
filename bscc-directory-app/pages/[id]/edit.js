import { useRouter } from 'next/router';
import useSWR from 'swr';
import Form from '../../components/form/Form';

const fetcher = (url) =>
	fetch(url)
		.then((res) => res.json())
		.then((json) => json.data);

const EditBusiness = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data: business, error } = useSWR(
		id ? `/api/businesses/${id}` : null,
		fetcher
	);

	if (error) return <p>Failed to load</p>;
	if (!business) return <p>Loading...</p>;

	const businessForm = {
		name: business.name,
		contact: {
			phone: business.contact.phone,
			website: business.contact.website,
			email: business.contact.email,
		},
		address: {
			line_1: business.address.line_1,
			line_2: business.address.line_2,
			town: business.address.town,
			postcode: business.address.postcode,
		},
		bio: business.bio,
		category: business.category,
		imageUrls: business.imageUrls,
	};
	return (
		<Form
			formId='edit-business-form'
			businessForm={businessForm}
			forNewBusiness={false}
		/>
	);
};

export default EditBusiness;
