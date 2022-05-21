import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: {
					label: 'Username',
					type: 'username',
					placeholder: 'Username',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},
			authorize: (credentials) => {
				if (
					credentials.username === 'John Doe' &&
					credentials.password === 'test'
				) {
					return {
						id: 1,
						name: 'John',
						email: 'johndoe@test.com',
					};
				}
				return null;
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		session: ({ session, token }) => {
			if (token) {
				session.id = token.id;
			}
			return session;
		},
	},
	secret: 'test',
	jwt: {
		secret: 'test',
		encryption: true,
	},
});
