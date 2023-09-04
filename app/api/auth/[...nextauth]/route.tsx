import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const authOptions: any = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here...
  ],
  // pages: {
  //   signin: "/auth/signin",
  // },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }: any) {
      session.user.uid = token.sub; //add uid from token
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
