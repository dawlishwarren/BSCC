import React from 'react';
import styles from '../../styles/Home.module.css';

const Membership = () => {
	return (
		<section id='membership'>
			<div className={styles.container}>
				<h2>Benefits of membership:</h2>
				<ul>
					<li>
						Representation to Town Council, EDDC and DCC plus looking after your
						interests through liaison with other relevant bodies.
					</li>
					<li>
						Encouragement to participate through committees and event
						organising, working in and for the community.
					</li>
					<li>
						A free listing on the chamber website, including links to your own
						websites.
					</li>
					<li>
						Annual dinner dance to raise funds for the town’s christmas lights.
					</li>
					<li>Regular informative e-mails and general meetings.</li>
					<li>
						Chamber events are always listed on our website and our facebook
						page.
					</li>
					<li>
						If you have ideas about additional benefits the Chamber could offer,
						please contact us.
					</li>
				</ul>
			</div>
		</section>
	);
};

export default Membership;
