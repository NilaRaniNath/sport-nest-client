/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // ✅ Better-Auth এর মেইন এবং ক্যাশ তৈরি করা সব সাব-মডিউল এখানে একসাথে এক্সক্লুড করা হলো
  serverExternalPackages: [
    "better-auth", 
    "@better-auth/mongo-adapter", 
    "@better-auth/kysely-adapter"
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
      },
    ]
  }  
};

export default nextConfig;