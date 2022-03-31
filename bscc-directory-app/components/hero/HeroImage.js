import React from 'react';
import Image from 'next/image';
import highStreet from '../../public/img/highstreet.jpeg';
import styles from '../../styles/Hero.module.css';
import { ParallaxBanner } from 'react-scroll-parallax';

const HeroImage = () => {
	return (
		<ParallaxBanner
			layers={[
				{
					children: (
						<Image
							src={highStreet}
							layout='fill'
							priority='true'
							placeholder='blur'
						/>
					),
					speed: -30,
				},
				{
					children: (
						<div className={styles.header_container}>
							<h1 className={styles.header}>Budleigh Salterton</h1>
							<h2 className={styles.subheader}>Chamber of Commerce</h2>
						</div>
					),
					speed: 10,
				},
			]}
			className={styles.container}></ParallaxBanner>
	);
};
export default HeroImage;
