import styles from '../../styles/Form.module.css';
export default function PageWithoutJSbasedForm() {
	return (
		<form action='/api/email/form' className={styles.form}>
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
