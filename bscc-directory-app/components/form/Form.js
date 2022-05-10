import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

const Form = ({ formId, businessForm, forNewBusiness = true }) => {
	const { mutate } = useSWRConfig();
	const router = useRouter();
	const contentType = 'application/json';
	const [errors, setErrors] = useState({});
	const [message, setMessage] = useState('');

	const [form, setForm] = useState({
		name: businessForm.name,
		bio: businessForm.bio,
		phone: businessForm.contact.phone,
		website: businessForm.contact.website,
		email: businessForm.contact.email,
		line_1: businessForm.address.line_1,
		line_2: businessForm.address.line_2,
		town: businessForm.address.town,
		postcode: businessForm.address.postcode,
		category: businessForm.category,
	});

	/* The PUT method edits an existing entry in the mongodb database. */
	const putData = async (form) => {
		const { id } = router.query;

		try {
			const res = await fetch(`/api/businesses/${id}`, {
				method: 'PUT',
				headers: {
					Accept: contentType,
					'Content-Type': contentType,
				},
				body: JSON.stringify({
					name: form.name,
					contact: {
						phone: form.phone,
						website: form.website,
						email: form.email,
					},
					address: {
						line_1: form.line_1,
						line_2: form.line_2,
						town: form.town,
						postcode: form.postcode,
					},
					bio: form.bio,
					category: form.category,
				}),
			});

			// Throw error with status code in case Fetch API req failed
			if (!res.ok) {
				throw new Error(res.status);
			}

			const { data } = await res.json();
			console.log(data);
			mutate(`/api/business/${id}`, data, false); // Update the local data without a revalidation
			router.push('/directory');
		} catch (error) {
			setMessage('Failed to update business');
		}
	};

	// POST method adds new entry
	const postData = async (form) => {
		try {
			const res = await fetch('/api/businesses', {
				method: 'POST',
				headers: {
					Accept: contentType,
					'Content-Type': contentType,
				},
				body: JSON.stringify({
					name: form.name,
					contact: {
						phone: form.phone,
						website: form.website,
						email: form.email,
					},
					address: {
						line_1: form.line_1,
						line_2: form.line_2,
						town: form.town,
						postcode: form.postcode,
					},
					bio: form.bio,
					category: form.category,
				}),
			});
			console.log(form);
			if (!res.ok) {
				throw new Error(res.status);
			}
			router.push('/directory');
		} catch (error) {
			setMessage('Failed to add business');
		}
	};

	// TO FIX:
	// State not updating properly, creating a new field rather than updating form state field
	// Should aim to rewrite the form state to avoid nested properties
	// Needs to be done in a way that ensures the form data fits the Business model

	const handleChange = (e) => {
		e.preventDefault();
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
		if (!form.name) error.name = 'Name is required';
		if (!form.phone) error.phone = 'A phone number is required';
		if (!form.line_1) error.line_1 = 'A full address is required';
		if (!form.town) error.town = 'A full address is required';
		if (!form.postcode) error.postcode = 'A full address is required';
		if (!form.bio) error.bio = 'A business description is required';
		return error;
	};

	return (
		<>
			<h2>Business</h2>
			<form id={formId} onSubmit={handleSubmit}>
				<label htmlFor='name'>Name</label>
				<input
					type='text'
					name='name'
					value={form.name}
					onChange={handleChange}
					required
				/>
				<h3>Contact</h3>
				<label htmlFor='phone'>Phone</label>
				<input
					type='text'
					name='phone'
					value={form.phone}
					onChange={handleChange}
					required
				/>
				<label htmlFor='website'>Website</label>
				<input
					type='text'
					name='website'
					value={form.website}
					onChange={handleChange}
				/>
				<label htmlFor='email'>Email</label>
				<input
					type='text'
					name='email'
					value={form.email}
					onChange={handleChange}
				/>
				<h3>Address</h3>
				<label htmlFor='line_1'>Line 1</label>
				<input
					type='text'
					name='line_1'
					value={form.line_1}
					onChange={handleChange}
					required
				/>
				<label htmlFor='line_2'>Line 2</label>
				<input
					type='text'
					name='line_2'
					value={form.line_2}
					onChange={handleChange}
				/>
				<label htmlFor='town'>Town</label>
				<input
					type='text'
					name='town'
					value={form.town}
					onChange={handleChange}
					required
				/>
				<label htmlFor='postcode'>Postcode</label>
				<input
					type='text'
					name='postcode'
					value={form.postcode}
					onChange={handleChange}
					required
				/>
				<br />
				<h3>Details</h3>
				<label htmlFor='bio'>Bio</label>
				<input
					type='text'
					name='bio'
					value={form.bio}
					onChange={handleChange}
					required
				/>

				<fieldset>
					<legend>Business Category</legend>
					<input
						type='radio'
						id='restaurant'
						name='category'
						value='restaurant'
						checked={form.category === 'restaurant'}
						onChange={handleChange}
					/>
					<label htmlFor='restaurant'>Restaurant</label>
					<input
						type='radio'
						id='shop'
						name='category'
						value='shop'
						checked={form.category === 'shop'}
						onChange={handleChange}
					/>
					<label htmlFor='shop'>Shop</label>
					<input
						type='radio'
						id='service'
						name='category'
						value='service'
						checked={form.category === 'service'}
						onChange={handleChange}
					/>
					<label htmlFor='service'>Service</label>
					<input
						type='radio'
						id='other'
						name='category'
						value='other'
						checked={form.category === 'other' || form.category === undefined}
						onChange={handleChange}
					/>
					<label htmlFor='other'>Other</label>
				</fieldset>
				<br />
				<button type='submit'>Submit</button>
			</form>
		</>
	);
};

export default Form;
