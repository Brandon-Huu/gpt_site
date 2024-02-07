This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Created using the chatgpt provided design guide

```sh
npx create-next-app@latest my-next-auth-app
cd my-next-auth-app
npm install next-auth

# Create .env.local with the provided content
echo "GITHUB_ID=your_github_oauth_app_id" > .env.local
echo "GITHUB_SECRET=your_github_oauth_app_secret" >> .env.local

# Start the development server
npm run dev
```

To create this full-stack application with Next.js and NextAuth, we will need to set up a Next.js project, configure NextAuth for GitHub OAuth authentication, and create the necessary pages and components to handle user authentication.

Let's start by setting up the Next.js project and installing the necessary dependencies.

First, we will initialize a new Next.js project and install the dependencies:

```bash
npx create-next-app@latest my-next-auth-app
cd my-next-auth-app
npm install next-auth
```

Now, let's define the files and their content:

`pages/_app.js`
```javascript
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
```

`pages/api/auth/[...nextauth].js`
```javascript
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session(session, user) {
      session.user.email = user.email; // Pass the email to the front-end
      return session;
    },
  },
});
```

`pages/index.js`
```javascript
import { signIn, signOut, useSession } from 'next-auth/client';

export default function Home() {
  const [session, loading] = useSession();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {!session && (
        <>
          <button onClick={() => signIn('github')}>Login with GitHub</button>
        </>
      )}
      {session && (
        <>
          <h1>You are logged in {session.user.email}</h1>
          <button onClick={() => signOut()}>Logout</button>
        </>
      )}
    </div>
  );
}
```

`.env.local`
```
GITHUB_ID=your_github_oauth_app_id
GITHUB_SECRET=your_github_oauth_app_secret
```

Make sure to replace `your_github_oauth_app_id` and `your_github_oauth_app_secret` with your actual GitHub OAuth application credentials.

`package.json` (additions only)
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "latest",
    "next-auth": "^3.0.0",
    "react": "^17.0.1",
    "react-dom": "^17.0.1"
  }
}
```

Run the development server:

```bash
npm run dev
```

This concludes a fully working implementation.
