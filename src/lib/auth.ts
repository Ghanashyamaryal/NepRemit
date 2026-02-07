import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "./mongodb";
import { User } from "@/models/User";
import { authConfig } from "./auth.config";

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig,
  providers: [
    ...authConfig.providers.filter((p) => p.id !== "credentials"),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          await connectDB();

          const user = await User.findOne({ email: credentials.email }).select(
            "+password"
          );

          if (!user) {
            throw new Error("No user found with this email");
          }

          if (!user.password) {
            throw new Error("Please use Google sign in for this account");
          }

          const isPasswordValid = await user.comparePassword(
            credentials.password as string
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          console.log("=== Google Sign In Started ===");
          console.log("User email:", user.email);

          console.log("Connecting to MongoDB...");
          await connectDB();
          console.log("MongoDB connected successfully");

          console.log("Looking for existing user...");
          const existingUser = await User.findOne({ email: user.email });
          console.log("Existing user found:", !!existingUser);

          if (!existingUser) {
            console.log("Creating new user...");
            await User.create({
              email: user.email,
              name: user.name,
              image: user.image,
              googleId: account.providerAccountId,
              emailVerified: new Date(),
            });
            console.log("New user created successfully");
          } else {
            if (!existingUser.googleId) {
              console.log("Linking Google account to existing user...");
              await User.findByIdAndUpdate(existingUser._id, {
                googleId: account.providerAccountId,
                image: user.image || existingUser.image,
                emailVerified: existingUser.emailVerified || new Date(),
              });
            } else {
              console.log("Updating existing Google user...");
              await User.findByIdAndUpdate(existingUser._id, {
                name: user.name,
                image: user.image,
              });
            }
            console.log("User updated successfully");
          }

          console.log("=== Google Sign In Completed ===");
          return true;
        } catch (error: unknown) {
          console.error("=== Google Sign In ERROR ===");
          console.error("Error type:", (error as Error)?.constructor?.name);
          console.error("Error message:", (error as Error)?.message);
          console.error("Full error:", error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        await connectDB();
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) {
          token.userId = dbUser._id.toString();
          token.rememberMe = dbUser.rememberMe;
        }
      }

      if (trigger === "update" && session) {
        if (session.rememberMe !== undefined) {
          token.rememberMe = session.rememberMe;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token.userId) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
});
