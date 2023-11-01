import emailQueue from "../queues/emailQueue.js";
import smsQueue from "../queues/smsQueue.js";

const defaultEmailTemplate = (otp) => `<h1>Your one-time verification code is ${otp} .</h1>`;
const defaultMobileOtpMessage = (otp) => `Your one-time verification code is ${otp}.`;

const defaultEmailSubject = "HDP verification code";

const sendEmailOrMessage = ({ onMobile = false, onEmail = false, user, otp, emailSubject = defaultEmailSubject, templates }) => {
    try {
        let { emailTemplate = defaultEmailTemplate, mobileOtpMessage = defaultMobileOtpMessage } = templates || {};

        if (!emailTemplate) emailTemplate = defaultEmailTemplate; // if emailTemplate is not provided or its false, use defaultEmailTemplate
        if (!mobileOtpMessage) mobileOtpMessage = defaultMobileOtpMessage; // if mobileOtpMessage is not provided or its false, use defaultMobileOtpMessage

        if (onEmail) {
            emailQueue.add({
                email: user.email,
                subject: emailSubject,
                message: emailTemplate(otp, templates.additionalData),
            }, {
                attempts: 3,
                backoff: {
                    type: "fixed",
                    delay: 5000,
                },
            });
        }
        if (onMobile) {
            smsQueue.add({
                phoneNumber: user.phoneNumber,
                message: mobileOtpMessage(otp, templates.additionalData),
            }, {
                attempts: 3,
                backoff: {
                    type: "fixed",
                    delay: 5000,
                },
            });
        }
        return [onEmail, onMobile];
    } catch (error) {
        throw new Error(error);
    }
};

export default sendEmailOrMessage;
