import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: { prompt: "select_account" },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const provider = account.provider;
        const providerId = profile.sub || profile.id; 
        const name = profile.name;
        const email = profile.email;
        const profilePicture = profile.picture || profile.avatar_url; 

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ provider, providerId, name, email, profilePicture }),
          });

          if (res.ok) {
            const data = await res.json();
            token.backendToken = data.token;
            token.id = data.user.id;
            token.stack = data.user.stack;
            token.description = data.user.description;
            token.linkedin = data.user.linkedin;
            token.telegram = data.user.telegram;
            token.github = data.user.github;
            token.reddit = data.user.reddit;
            token.facebook = data.user.facebook;
          }
        } catch (error) {
          console.error('Backend auth error:', error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
        session.user.token = token.backendToken;
        session.user.stack = token.stack;
        session.user.description = token.description;
        session.user.linkedin = token.linkedin;
        session.user.telegram = token.telegram;
        session.user.github = token.github;
        session.user.reddit = token.reddit;
        session.user.facebook = token.facebook;
      }
      return session;
    },
  },
  pages: { signIn: "/" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 