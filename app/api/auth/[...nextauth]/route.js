import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@/models/userModels";
import { connectDb } from "@/utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      try {
        await connectDb();
        const sessionUser = await User.findOne({ email: session.user.email });

        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }

        return session;
      } catch (error) {
        console.error("Error fetching user from MongoDB:", error.message);
        throw error;
      }
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectDb();

        // Check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // If not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error(
          "Error checking if user exists or creating user:",
          error.message
        );
        throw error;
      }
    },
  },
});

export { handler as GET, handler as POST };
