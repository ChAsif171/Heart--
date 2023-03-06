const Login = (otp) => `Your one-time log in verification code is ${otp}`;
const VerifyMobile = (otp) => `Thank you for applying for an Easy E-Money account. Your mobile verification code is ${otp}`;
const DeletePayee = (otp, rest = {}) => `Confirmation: Payee ${rest.payeeName} has been successfully removed from your Easy E-Money account.`;
const NewPayee = (otp, rest = {}) => `Confirmation: A new payee has been set up on your Easy E-Money account. If you do not recognize ${rest.payeeName} recently added to your account, please contact us immediately.`;

export { Login, VerifyMobile, DeletePayee, NewPayee };
