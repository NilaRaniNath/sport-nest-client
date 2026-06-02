import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";

let client;
if (!global._mongoClient) {
  global._mongoClient = new MongoClient(process.env.MONGODB_URI);
}
client = global._mongoClient;
const db = client.db("sportnest");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://sport-nest-flax.vercel.app",
  ],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60,
    },
  },
  plugins: [jwt()],
});