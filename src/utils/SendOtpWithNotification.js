/* eslint-disable no-param-reassign */
/* eslint-disable require-atomic-updates */
// import Users from "../../models/users.js";
import addMinutesToCurrentDate from "./addMinutesToCurrentDate.js";
import otpGenerator from "./otpGenerator.js";
import sendEmailOrMessage from "./sendEmailOrMessage.js";
import { OtpTypes } from "../constants/index.js";

const SendOtpWithNotification = async ({ user, otpType, onMobile = false, onEmail = false, resendOtp = false, templates }) => {
    try {
        const otp = otpGenerator();
        const currentTime = new Date().getTime();

        // if the otp is requested for multiple time within 15 mins,
        if (resendOtp && user.otpType === otpType && currentTime < user.otpExpiry) {
            const message = `Please wait for ${new Date(user.otpExpiry - currentTime).getMinutes()} minutes and ${new Date(user.otpExpiry - currentTime).getSeconds()} seconds before requesting for another otp`;
            return {
                success: false,
                message,
            };
        }
        if (otpType) {
            user.otp = otp;
            user.otpExpiry = addMinutesToCurrentDate(15);
            user.otpType = otpType;
            user.otpVerified = false;
            await user.save();
        }

        const [sendEmail, sendMessage] = sendEmailOrMessage({ onMobile, onEmail, user, otp, emailSubject: otpType, templates });
        return {
            success: true,
            message: `${otpType ? "Otp" : "Email"} has been sent to ${onEmail && sendEmail ? "email" : " "}${onMobile && sendMessage ? "mobile" : " "}`,
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

export default SendOtpWithNotification;
