import styles from './Form.module.css';
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
		alert(`Message: ${result.data}`);
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<div className={styles.form_area}>
				<label className={formStyles.label} htmlFor='name'>
					Your name
				</label>
				<input
					type='text'
					name='name'
					className={formStyles.input_field}
					required
				/>
			</div>
			<div className={styles.form_area}>
				<label className={formStyles.label} htmlFor='email'>
					Your email
				</label>
				<input
					type='email'
					name='email'
					className={formStyles.input_field}
					required
				/>
			</div>
			<div className={styles.form_area}>
				<label className={formStyles.label} htmlFor='phone'>
					Phone number
				</label>
				<input type='text' name='phone' className={formStyles.input_field} />
			</div>
			<div className={styles.form_area}>
				<label className={formStyles.label} htmlFor='subject'>
					Subject
				</label>
				<input
					type='text'
					name='subject'
					className={formStyles.input_field}
					required
				/>
			</div>
			<div className={styles.form_area}>
				<label className={formStyles.label} htmlFor='message'>
					Your message
				</label>
				<textarea
					type='text'
					name='message'
					className={formStyles.input_field}
					required
				/>
			</div>
			<button type='submit' className={styles.submit}>
				Send message
			</button>
		</form>
	);
}
