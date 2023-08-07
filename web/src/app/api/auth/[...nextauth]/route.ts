import NextAuth from "next-auth";

const handler = NextAuth({
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
      profile: ({ user }) => user,
      clientId: process.env.OSM_CLIENT_ID,
      clientSecret: process.env.OSM_CLIENT_SECRET,
    },
  ],
});

export { handler as GET, handler as POST };
