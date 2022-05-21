import styles from '../../styles/Form.module.css';

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
		alert(`Message: ${result.data}`);
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<div className={styles.form_area}>
				<label className={styles.label} htmlFor='name'>
					Your name
				</label>
				<input
					type='text'
					name='name'
					className={styles.input_field}
					required
				/>
			</div>
			<div className={styles.form_area}>
				<label className={styles.label} htmlFor='email'>
					Your email
				</label>
				<input
					type='email'
					name='email'
					className={styles.input_field}
					required
				/>
			</div>
			<div className={styles.form_area}>
				<label className={styles.label} htmlFor='phone'>
					Phone number
				</label>
				<input type='text' name='phone' className={styles.input_field} />
			</div>
			<div className={styles.form_area}>
				<label className={styles.label} htmlFor='subject'>
					Subject
				</label>
				<input
					type='text'
					name='subject'
					className={styles.input_field}
					required
				/>
			</div>
			<div className={styles.form_area}>
				<label className={styles.label} htmlFor='message'>
					Your message
				</label>
				<textarea
					type='text'
					name='message'
					className={styles.input_field}
					required
				/>
			</div>
			<button type='submit' className={styles.submit}>
				Send message
			</button>
		</form>
	);
}
