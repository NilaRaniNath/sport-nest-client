import { betterAuth } from "better-auth";
// 🎯 এখানে mongoAdapter পরিবর্তন করে mongodbAdapter করা হয়েছে
import { mongodbAdapter } from "@better-auth/mongo-adapter"; 
import { MongoClient } from "mongodb";

// Next.js ডাবল কানেকশন জটলা এড়ানোর স্ট্যান্ডার্ড উপায়
let client;
if (!global._mongoClient) {
    global._mongoClient = new MongoClient(process.env.MONGODB_URI);
}
client = global._mongoClient;

const db = client.db("sportnest");

export const auth = betterAuth({
    // 🎯 এখানেও মেথডের নাম ঠিক করা হলো
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