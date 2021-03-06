import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import Layout from '../layout/layout';
import styles from './Form.module.css';
import buttonStyles from '../button/Button.module.css';
import formStyles from '../../styles/utils/Forms.module.css';
import Button from '../button/Button';
import { BiArrowBack, BiEditAlt } from 'react-icons/bi';

// File uploader:
// 1. Input field for uploading images.

// 2. Validation based on size and file size
// a. Don't use PNG for image, fine for logo
// 3. Change handler handles images for preview and also form updates
// 4. Commits to database
// a. Check that mongodb is best place to handle images
// b. Otherwise look into CORS solution

const Form = ({ formId, businessForm, forNewBusiness = true }) => {
	const { mutate } = useSWRConfig();
	const router = useRouter();
	const contentType = 'application/json';
	const [errors, setErrors] = useState({});
	const [message, setMessage] = useState('');
	const [imagesSource, setImagesSource] = useState([]);
	const [logoSource, setLogoSource] = useState('');

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
		image: businessForm.image,
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

	const handleImageChange = (changeEvent) => {
		for (const file of changeEvent.target.files) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				setImagesSource((images) => [...images, reader.result]);
			};
			reader.onerror = () => {
				console.log(reader.error);
			};
		}
	};
	const handleImageDelete = (changeEvent) => {
		// Get image source of target
		const targetSrc = changeEvent.target.parentElement.firstChild.src;
		// Filter state
		const filtered = imagesSource.filter((imgSrc) => imgSrc != targetSrc);
		// Return filtered state
		setImagesSource(filtered);
	};
	const handleLogoChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setLogoSource(reader.result);
		};
		reader.onerror = () => {
			console.log(reader.error);
		};
	};
	const handleLogoDelete = () => {
		setLogoSource('');
	};

	return (
		<Layout>
			{/* Back button */}
			<div className={buttonStyles.back_button_container}>
				<Button type='back' href='/directory' inner={<BiArrowBack />} />
				<h4 className={buttonStyles.back_button_text}>Back to directory</h4>
			</div>
			<div className={styles.header}>
				<h2 className={styles.title}>
					{forNewBusiness
						? `Add Business: ${form.name}`
						: `Edit Business: ${form.name}`}{' '}
				</h2>
				{forNewBusiness && (
					<p>
						Fill in the fields below, add any relevant images with the file
						uploader, and press the green submit button at the bottom to save
						the business.
					</p>
				)}
				{!forNewBusiness && (
					<p>
						Edit any of the fields below, add or remove any images and press the
						submit button at the bottom to save your changes.
					</p>
				)}
			</div>
			<form id={formId} onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.form_area}>
					<div className={styles.bio_container}>
						<div className={styles.subtitle_container}>
							<h3 className={styles.subtitle}>Details:</h3>
						</div>
						<label className={formStyles.label} htmlFor='name'>
							Name
						</label>
						<input
							className={formStyles.input_field}
							type='text'
							name='name'
							value={form.name}
							onChange={handleChange}
							required
						/>
						<label className={formStyles.label} htmlFor='bio'>
							Bio
						</label>
						<textarea
							className={formStyles.textarea}
							type='text'
							name='bio'
							value={form.bio}
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.contact_container}>
						<div className={styles.subtitle_container}>
							<h3 className={styles.subtitle}>Contact:</h3>
						</div>
						<label className={formStyles.label} htmlFor='phone'>
							Phone
						</label>
						<input
							className={formStyles.input_field}
							type='text'
							name='phone'
							value={form.phone}
							onChange={handleChange}
							required
							placeholder='01395 000000'
						/>
						<label className={formStyles.label} htmlFor='website'>
							Website
						</label>
						<input
							className={formStyles.input_field}
							type='text'
							name='website'
							value={form.website}
							onChange={handleChange}
							placeholder='www.example.com'
						/>
						<label className={formStyles.label} htmlFor='email'>
							Email
						</label>
						<input
							className={formStyles.input_field}
							type='text'
							name='email'
							value={form.email}
							onChange={handleChange}
							placeholder='example@mail.com'
						/>
					</div>

					<div className={styles.address_container}>
						<div className={styles.subtitle_container}>
							<h3 className={styles.subtitle}>Address:</h3>
						</div>
						<label className={formStyles.label} htmlFor='line_1'>
							Line 1
						</label>
						<input
							className={formStyles.input_field}
							type='text'
							name='line_1'
							value={form.line_1}
							onChange={handleChange}
							required
							placeholder='House Number or Name (or Street if not applicatable)'
						/>
						<label className={formStyles.label} htmlFor='line_2'>
							Line 2
						</label>
						<input
							className={formStyles.input_field}
							type='text'
							name='line_2'
							value={form.line_2}
							onChange={handleChange}
							placeholder='Street'
						/>
						<label className={formStyles.label} htmlFor='town'>
							Town
						</label>
						<input
							className={formStyles.input_field}
							type='text'
							name='town'
							value={form.town}
							onChange={handleChange}
							required
							placeholder='Town'
						/>
						<label className={formStyles.label} htmlFor='postcode'>
							Postcode
						</label>
						<input
							className={formStyles.input_field}
							type='text'
							name='postcode'
							value={form.postcode}
							onChange={handleChange}
							required
							placeholder='Postcode'
						/>
					</div>
					{/* ***************************** */}
					<div className={styles.images_container}>
						<div className={styles.subtitle_container}>
							<h3 className={styles.subtitle}>Image and Logo:</h3>
						</div>
						<label
							className={formStyles.custom_file_upload}
							htmlFor='image-upload'>
							Click to upload your business image
							<input
								className={formStyles.input_field}
								id='image-upload'
								type='file'
								name='image'
								onChange={handleImageChange}
								accept='image/*'
								multiple
							/>
						</label>
						<div className={styles.preview_container}>
							{imagesSource.map((link, index) => (
								<div className={styles.image_preview_container} key={index}>
									<img src={link} className={styles.image_preview} />
									<button
										onClick={handleImageDelete}
										className={`${buttonStyles.button} ${buttonStyles.delete} ${buttonStyles.small} ${styles.image_preview_delete}`}>
										X
									</button>
								</div>
							))}
							{imagesSource.length > 0 && (
								<p>Add more or press the red X to delete a selection</p>
							)}
						</div>
						<label
							className={formStyles.custom_file_upload}
							htmlFor='logo-upload'>
							Click to upload your logo
							<input
								className={formStyles.input_field}
								id='logo-upload'
								type='file'
								name='logo'
								onChange={handleLogoChange}
								accept='image/*'
							/>
						</label>
						<div className={styles.preview_container}>
							<div className={styles.image_preview_container}>
								<img src={logoSource} className={styles.image_preview} />
								{logoSource != '' && (
									<button
										onClick={handleLogoDelete}
										className={`${buttonStyles.button} ${buttonStyles.delete} ${buttonStyles.small} ${styles.image_preview_delete}`}>
										X
									</button>
								)}
							</div>
						</div>
					</div>
					{/* ***************************** */}
					<div className={styles.fieldset_container}>
						<div className={styles.subtitle_container}>
							<h3 className={styles.subtitle}>Business Category:</h3>
						</div>
						<fieldset className={styles.fieldset}>
							<legend>Choose the category that best suits your business</legend>
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
								checked={
									form.category === 'other' || form.category === undefined
								}
								onChange={handleChange}
							/>
							<label htmlFor='other'>Other</label>
						</fieldset>
					</div>
				</div>
				{/* Form submit button: styles depend on whether form is Add or Edit */}
				<div className={buttonStyles.buttons_container}>
					<button
						type='submit'
						className={`${[buttonStyles.button]} ${
							forNewBusiness ? [buttonStyles.add] : [buttonStyles.edit]
						}`}>
						{forNewBusiness ? `+` : <BiEditAlt />}
					</button>
					{forNewBusiness ? <h2>Submit new business</h2> : <h2>Submit edit</h2>}
				</div>
			</form>
		</Layout>
	);
};

export default Form;
