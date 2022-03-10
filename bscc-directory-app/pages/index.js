import Head from 'next/head';
import Image from 'next/image';
import HeroImage from '../components/hero/HeroImage';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<HeroImage />
			</main>
			<section>
				<h3>About us</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
					repellendus omnis dicta saepe vero reiciendis a! Quos quo rem atque
					numquam iste, autem rerum, provident deleniti quasi natus, dolorum
					nihil.
				</p>
				<br />
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
					repellendus omnis dicta saepe vero reiciendis a! Quos quo rem atque
					numquam iste, autem rerum, provident deleniti quasi natus, dolorum
					nihil.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
					repellendus omnis dicta saepe vero reiciendis a! Quos quo rem atque
					numquam iste, autem rerum, provident deleniti quasi natus, dolorum
					nihil.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
					repellendus omnis dicta saepe vero reiciendis a! Quos quo rem atque
					numquam iste, autem rerum, provident deleniti quasi natus, dolorum
					nihil.
				</p>
			</section>
			<footer className={styles.footer}>
				<a
					href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
					target='_blank'
					rel='noopener noreferrer'>
					Powered by{' '}
					<span className={styles.logo}>
						<Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	);
}
