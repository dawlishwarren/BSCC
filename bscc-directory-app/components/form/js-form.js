import styles from '../../styles/contact/Contactform.module.css';
import formStyles from '../../styles/utils/Forms.module.css';

export default function PageWithJSbasedForm() {
	// Submit handler
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = {
			name: event.target.name.value,
			email: event.target.email.value,
			phone: event.target.phone.value,
			subject: event.target.subject.value,
			message: event.target.message.value,
		};
		const JSONdata = JSON.stringify(data);
		const endpoint = '/api/email/form';
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSONdata,
		};
		const response = await fetch(endpoint, options);
		const result = await response.json();
		alert(`Message: ${result}`);
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<label className={formStyles.label} htmlFor='name' />
			<div className={styles.form_area}>
				<input
					type='text'
					name='name'
					className={styles.input_field}
					required
					placeholder='Name'
				/>
			</div>
			<div className={styles.form_area}>
				<label className={formStyles.label} htmlFor='email' />
				<input
					type='email'
					name='email'
					className={styles.input_field}
					required
					placeholder='Email address'
				/>
			</div>
			<div className={styles.form_area}>
				<label className={formStyles.label} htmlFor='phone' />
				<input
					type='text'
					name='phone'
					className={styles.input_field}
					placeholder='Phone number (optional)'
				/>
			</div>
			<div className={styles.form_area}>
				<label className={formStyles.label} htmlFor='subject' />
				<input
					type='text'
					name='subject'
					className={styles.input_field}
					required
					placeholder='Subject'
				/>
			</div>
			<div className={styles.form_area}>
				<label className={formStyles.label} htmlFor='message' />
				<textarea
					type='text'
					name='message'
					className={styles.textarea_field}
					required
					placeholder='Your question'
				/>
			</div>
			<button type='submit' className={styles.submit}>
				Send message
			</button>
		</form>
	);
}
