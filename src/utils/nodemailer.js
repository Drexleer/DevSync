const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAILCLIENT,
    pass: process.env.PASSWORDCLIENT,
  },
});

transporter
  .verify()
  .then(() => console.log("Gmail enviado con exito!!!"))
  .catch((error) => console.log(error));

module.exports = transporter;
