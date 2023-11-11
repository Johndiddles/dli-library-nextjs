import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { BASE_URL } from "../../../constants/variables";

export const options = {
  providers: [
    GoogleProvider({
      async profile(profile) {
        // console.log("===============?profile", { profile });

        const userToDb = {
          name: profile.name,
          email: profile.email,
          password: "",
          authenticated_via: "oauth-google",
          role: "user",
          exp: profile.exp,
        };

        const response = await fetch(`${BASE_URL}/user/login`, {
          method: "POST",
          body: JSON.stringify(userToDb),
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log({ response });

        if (response.status !== 200 && response.status !== 201) {
          const error = await response.json();
          console.log({ error });
          return {
            message: "failed",
            error,
          };
        }

        const data = await response.json();

        return {
          ...profile,
          ...data.user,
          id: profile.sub,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.token = user.token;
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.token = token.token;
      }

      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
};

export default NextAuth(options);
// export { handler as GET, handler as POST };
