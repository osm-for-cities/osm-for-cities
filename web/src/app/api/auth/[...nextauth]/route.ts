import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    {
      id: "openstreetmap",
      name: "OpenStreetMap",
      type: "oauth",
      version: "2.0",
      token: "https://www.openstreetmap.org/oauth2/token",
      authorization: {
        url: "https://www.openstreetmap.org/oauth2/authorize",
        params: {
          scope: "read_prefs",
        },
      },
      userinfo: "https://api.openstreetmap.org/api/0.6/user/details.json",
      profileUrl: "https://api.openstreetmap.org/api/0.6/user/details.json",
      profile: ({ user }) => {
        return {
          id: user.id,
          osmId: user.id,
          displayName: user.display_name,
        };
      },
      clientId: process.env.OSM_CLIENT_ID,
      clientSecret: process.env.OSM_CLIENT_SECRET,
    },
  ],
});

export { handler as GET, handler as POST };
