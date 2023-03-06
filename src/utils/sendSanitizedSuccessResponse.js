function SEND_SANITIZED_SUCCESS_RESPONSE(user) {
    const { password, otp, otpType, otpVerified, createdAt, updatedAt, ...rest } = user.toObject();
    return rest;
}
export default SEND_SANITIZED_SUCCESS_RESPONSE;
