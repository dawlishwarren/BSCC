import React from 'react';
import Link from 'next/link';
import styles from '../../styles/Navbar.module.css';
import { signOut, useSession } from 'next-auth/react';

const Login = () => {
	const { data: session } = useSession();
	console.log('session', session);

	{
		/* Sign in / out button */
	}
	{
		/* session ? sign out (signOut()) : sign in (Link href api/auth/signin) */
	}
	return (
		<>
			{session ? (
				<li className={styles.link_item} onClick={() => signOut()}>
					Log out
				</li>
			) : (
				<Link href='/api/auth/signin'>
					<li className={styles.link_item}>Log in</li>
				</Link>
			)}
		</>
	);
};

export default Login;
