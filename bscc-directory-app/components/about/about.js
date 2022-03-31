import React from 'react';
import styles from '../../styles/Home.module.css';

const About = () => {
	return (
		<section id='about'>
			<div className={[styles.container, styles.section_1].join(' ')}>
				<h2>Who are we?</h2>
				<p>
					The Budleigh Salterton and District Chamber of Commerce has been in
					existence for 111 years, representing local businesses and plays an
					important role within the Community, working alongside other
					interested organisations in the town to promote all the interests of
					the area. We all know what a delightful and unique place Budleigh
					Salterton is, but fresh input is always welcome.
				</p>
				<p>
					The Chamber organises various events throughout the year, often
					working with other local organisations for the benefit of the town and
					the general public. Any profits made always go towards the purchase
					and upkeep of the christmas lights or towards the entertainment for
					the very successful Christmas late night shopping evening. The
					christmas lights, decorations, erection of the christmas trees in the
					High Street and the organisation of the late night shopping are the
					sole responsibility of the chamber and just would not happen without
					us.
				</p>
				<p>
					We are friendly, supportive and work hard in all our activities to
					promote our members and the businesses within our district.
				</p>
			</div>
		</section>
	);
};

export default About;
