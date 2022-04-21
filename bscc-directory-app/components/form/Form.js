import { useRouter } from "next/router";
import { useState } from "react";
import { mutate } from "swr";

const Form = ({ formId, businessForm, forNewBusiness = true }) => {
	const router = useRouter();
	const contentType = "application/json";
	const [errors, setErrors] = useState({});
	const [message, setMessage] = useState("");

	const [form, setForm] = useState({
		name: businessForm.name,
		bio: businessForm.bio,
		phone: businessForm.phone,
		website: businessForm.website,
		line_1: businessForm.line_1,
		line_2: businessForm.line_2,
		town: businessForm.town,
		postcode: businessForm.postcode,
	});

	// PUT method to edit an existing entry in the mongoDB database
	const putData = async (form) => {
		const { id } = router.query;

		try {
			const res = await fetch(`api/businesses/${id}`, {
				method: "PUT",
				headers: {
					Accept: contentType,
					"Content-Type": contentType,
				},
				body: JSON.stringify(form),
			});

			if (!res.ok) {
				throw new Error(res.status);
			}
			const { data } = await res.json();

			mutate(`/api/businesses/${id}`, data, false); // update the local data without a revalidation
			router.push("/directory");
		} catch (error) {
			setMessage("Failed to update business");
		}
	};

	// POST method adds new entry
	const postData = async (form) => {
		try {
			const res = await fetch("/api/businesses", {
				method: "POST",
				headers: {
					Accept: contentType,
					"Content-Type": contentType,
				},
				body: JSON.stringify(form),
			});

			if (!res.ok) {
				throw new Error(res.status);
			}
			router.push("/directory");
		} catch (error) {
			setMessage("Failed to add business");
		}
	};

	const handleChange = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errors = formValidate();

		if (Object.keys(errors).length === 0) {
			forNewBusiness ? postData(form) : putData(form);
		} else {
			setErrors({ errors });
		}
	};

	const formValidate = () => {
		let error = {};
		if (!form.name) error.name = "Name is required";
		if (!form.phone) error.phone = "A phone number is required";
		if (!form.line_1) error.line_1 = "A full address is required";
		if (!form.line_2) error.line_2 = "A full address is required";
		if (!form.town) error.town = "A full address is required";
		if (!form.postcode) error.postcode = "A full address is required";
		if (!form.bio) error.bio = "A business description is required";
		return error;
	};

	return (
		<>
			<h2>Business</h2>
			<form id={formId} onSubmit={handleSubmit}>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					name="name"
					value={form.name}
					onChange={handleChange}
					required
				/>
				<h3>Contact</h3>
				<label htmlFor="phone">Phone</label>
				<input
					type="text"
					name="phone"
					value={form.phone}
					onChange={handleChange}
					required
				/>
				<label htmlFor="website">Website</label>
				<input
					type="text"
					name="website"
					value={form.website}
					onChange={handleChange}
				/>
				<h3>Address</h3>
				<label htmlFor="line_1">Line 1</label>
				<input
					type="text"
					name="line_1"
					value={form.line_1}
					onChange={handleChange}
					required
				/>
				<label htmlFor="line_2">Line 2</label>
				<input
					type="text"
					name="line_2"
					value={form.line_2}
					onChange={handleChange}
					required
				/>
				<label htmlFor="town">Town</label>
				<input
					type="text"
					name="town"
					value={form.town}
					onChange={handleChange}
					required
				/>
				<label htmlFor="postcode">Postcode</label>
				<input
					type="text"
					name="postcode"
					value={form.postcode}
					onChange={handleChange}
					required
				/>
				<br />
				<h3>Details</h3>
				<label htmlFor="bio">Bio</label>
				<input
					type="text"
					name="bio"
					value={form.bio}
					onChange={handleChange}
					required
				/>
				<br />
				<button type="submit">Submit</button>
			</form>
		</>
	);
};

export default Form;
