module.exports = ({ env }) => ({
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: env("SENDGRID_API_KEY"),
    },
    settings: {
      defaultFrom: "miro.rajelo@gmail.com",
      defaultTo: "miro.rajelo@gmail.com",
    },
  },
});
