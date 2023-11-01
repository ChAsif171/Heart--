import mongoose from "mongoose";
import Users from "../../models/users.js";
import checkEmptyFields from "../../utils/checkEmptyFields.js";
import passwordValidation from "../../utils/passwordValidation.js";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import signJwtToken from "../../utils/signJWT.js";
import print from "../../utils/print.js";
import getAge from "../../utils/getAge.js";
=======
//import sendFinalResponse from "../../utils/sendFinalResponse.js";
import signJwtToken from "../../utils/signJWT.js";
import print from "../../utils/print.js";
//import { OtpTypes } from "../../constants/index.js";
import getAge from "../../utils/getAge.js";
//import chooseEmailTemplateAndMessage from "../../utils/chooseTemplateAndMessage.js";
>>>>>>> Stashed changes
import SEND_SANITIZED_SUCCESS_RESPONSE from "../../utils/sendSanitizedSuccessResponse.js";
import sendSuccessResponse from "../../utils/sendSuccessResponse.js";
=======
import sendSuccessResponse from "../../utils/sendSuccessResponse.js";
import SEND_SANITIZED_SUCCESS_RESPONSE from "../../utils/sendSanitizedSuccessResponse.js";
import signJwtToken from "../../utils/signJWT.js";
import print from "../../utils/print.js";
import SendOtpWithNotification from "../../utils/SendOtpWithNotification.js";
import chooseEmailTemplateAndMessage from "../../utils/chooseTemplateAndMessage.js";
import getAge from "../../utils/getAge.js";
import { ApiError } from "../../utils/ApiError.js";
import { EMAIL_REGEX } from "../../constants/regex.js";
import { OtpTypes } from "../../constants/index.js";
>>>>>>> Stashed changes

const UniqueUser = (users, matchWith) => {
    const errors = { email: "", phoneNumber: "", userDetails: "" };
    if (users.length <= 0) return true;
    users.forEach((user) => {
        if (checkEmptyFields(errors)) {
            return errors;
        }
        if (user.email === matchWith.email) {
            errors.email = "Email already exists";
        }
        if (user.phoneNumber === matchWith.phoneNumber) {
            errors.phoneNumber = "Phone number already exists";
        }
        if (user.firstName.toLowerCase() === matchWith.firstName.toLowerCase() && user.lastName.toLowerCase() === matchWith.lastName.toLowerCase() && user.dateOfBirth === matchWith.dateOfBirth) {
            errors.userDetails = "User details already exists first name, last name and date of birth";
        }
        return false;
    });
    return errors;
};

async function SignUp(req, res, next) {
<<<<<<< Updated upstream

    try {
        const { firstName, lastName, email, dateOfBirth, phoneNumber, password, confirmPassword } = req.body;
        console.log("in backened",  req.body);
        // check empty fields
        const errors = CheckIfAllRequiredFieldsArePresent(req.body, arrayOfRequiredFields); // returns an object with all the errors
        if (Object.keys(errors).length > 0) {
            throw new ApiError("Invalid Details", 400, `Please fill out the required fields : ${Object.keys(errors)} `, true);
        }

=======
    const session = await mongoose.startSession();
    session.startTransaction();
    const opts = { session };
    try {
        const { firstName, lastName, email, dateOfBirth, phoneNumber, password, confirmPassword } = req.body;
>>>>>>> Stashed changes
        // check unique user details
        const currentUserDetails = { email: email.toLowerCase(), phoneNumber, firstName, lastName, dateOfBirth };

        const Query = { $or: [{ $or: [{ email }, { phoneNumber }] }, { $and: [{ firstName: firstName.toLowerCase() }, { lastName: lastName.toLowerCase() }, { dateOfBirth }] }] };

        const user = await Users.find(Query).select("_id email phoneNumber firstName lastName dateOfBirth");
        print("users", user);
        const isUnique = UniqueUser(user, currentUserDetails);

        // check age > 18
        const age = getAge(dateOfBirth);
        // if (age < 20) {
        //     throw new ApiError("Invalid Details", 400, "Age should be greater than 20", true);
        // }

        if (isUnique !== true) {
            return res.status(400).json(isUnique);
        }

        // check password srength and confirm password
        if (passwordValidation.match(password, confirmPassword) !== true) throw new ApiError("Invalid Details", 400, `${passwordValidation.match(password, confirmPassword).error}`, true);
        if (passwordValidation.length(password) !== true) throw new ApiError("Invalid Details", 400, `${passwordValidation.length(password).error}`, true);
        if (passwordValidation.strength(password) !== true) throw new ApiError("Invalid Details", 400, `${passwordValidation.strength(password).error}`, true);

        if (!email.match(EMAIL_REGEX)) {
            throw new ApiError("Invalid Details", 400, "Enter the valid email", true);
        }
        // user add to database
        const newUser = new Users(req.body);
        if (!newUser) {
            throw new ApiError("Db Error", 400, `User not created `, true);
        }
        await newUser.save(opts); // opts -> { session } for transaction
        const token = signJwtToken(newUser._id);
        const sanitizedUser = SEND_SANITIZED_SUCCESS_RESPONSE(newUser);
        sanitizedUser.token = token;
<<<<<<< Updated upstream
        
=======

        // send email to user
        await SendOtpWithNotification({ user: newUser, otpType: OtpTypes.VerifyEmail, onEmail: true, onMobile: false, templates: chooseEmailTemplateAndMessage("WelcomeAtSignup", false, false) });
        // commit and end transaction
        await session.commitTransaction();
        session.endSession();

>>>>>>> Stashed changes
        print("success", "SignUp transaction completed");
        return sendSuccessResponse(res, 201, true, "User registered successfully.", null, sanitizedUser);
    } catch (error) {
<<<<<<< Updated upstream
        print("error in Signup", error);
=======
        // if error then abort transaction
        print("error", "Aborting SignUp transaction");
        await session.abortTransaction();
        session.endSession();
>>>>>>> Stashed changes
        next(error);
    } finally {
        session.endSession();
    }
}

export default SignUp;
