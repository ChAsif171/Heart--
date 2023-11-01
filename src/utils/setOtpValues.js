/* eslint-disable no-param-reassign */
async function SetOtpValues(model, otpVerified = false) {
    try {
        if (!model) return;
        model.otpExpiry = null;
        model.otp = null;
        model.otpType = null;
        model.otpVerified = otpVerified;
        await model.save();
        return;
    } catch (error) {
        throw new Error(error.message);
    }
}
export default SetOtpValues;
