import sendGrid from "@sendgrid/mail";
import ENV from "./keys.js";

sendGrid.setApiKey(ENV.SENDGRID.API_SECRET);

const sendEmail = (email, subject, html) => {
    const msg = {
        to: email,
        from: {
            name: "Stable App",
            email: ENV.SENDGRID.FROM,
        },
        subject,
        html,
        text: "Hello,",
    };
    return sendGrid.send(msg);
};

export default sendEmail;
