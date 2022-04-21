import Form from "../components/form/Form";

export default function NewBusiness() {
	const businessForm = {
		name: "",
		phone: "",
		website: "",
		line_1: "",
		line_2: "",
		town: "",
		postcode: "",
		bio: "",
	};
	// return <h1>Hello world</h1>;
	return <Form formId="add-business-form" businessForm={businessForm} />;
}
