import Head from 'next/head';
import Image from 'next/image';
import HeroImage from '../components/hero/HeroImage';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout/layout';
import About from '../components/about/about';
import Membership from '../components/membership/Membership';
import Session from '../components/session/Session';

export default function Home() {
	return (
		<div>
			<Head>
				<title>Budleigh Salterton Chamber of Commerce</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<HeroImage />
				<About />
				<Membership />
				<footer className={styles.footer}>
					<a
						href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
						target='_blank'
						rel='noopener noreferrer'>
						Powered by{' '}
						<span className={styles.logo}>
							<Image
								src='/vercel.svg'
								alt='Vercel Logo'
								width={72}
								height={16}
							/>
						</span>
					</a>
				</footer>
			</Layout>
		</div>
	);
}
