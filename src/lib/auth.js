import { betterAuth } from "better-auth";

import { mongodbAdapter } from "@better-auth/mongo-adapter"; 
import { MongoClient } from "mongodb";

let client;
if (!global._mongoClient) {
    global._mongoClient = new MongoClient(process.env.MONGODB_URI);
}
client = global._mongoClient;

const db = client.db("sportnest");

export const auth = betterAuth({
  
    database: mongodbAdapter(db), 
    emailAndPassword: {  
        enabled: true
    },
    trustedOrigins: [
        "http://localhost:3000",
        "http://localhost:3001"
    ],
    advanced: {
        disableDefaultEntries: true
    }
});