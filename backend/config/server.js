module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  // adding url property for ngrok
  // url: env("", "https://eb41-46-150-196-11.ngrok.io"),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "3d96c0d4b076e838aa4ab3c74fece8f8"),
    },
  },
});
