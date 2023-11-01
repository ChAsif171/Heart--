import ENV from "./keys.js";
import sendGrid from "@sendgrid/mail";
sendGrid.setApiKey(ENV.SENDGRID.API_SECRET);

const sendEmail = (email, otp) => {
  const msg = {
    to: email,
    from: {
      name: "Disease Prediction ",
      email: ENV.SENDGRID.FROM,
    },
    subject: "Verify OTP ",
    html: otp,
    text: "HDP Otp",
  };
  return sendGrid.send(msg);
};

export default sendEmail;
