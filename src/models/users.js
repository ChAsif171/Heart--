import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { RoleTypes } from "../constants/index.js";
import { ApiError } from "../utils/ApiError.js";
import print from "../utils/print.js";
import { PHONE_NUMBER_REGEX,EMAIL_REGEX,NAME_REGEX,PASSWORD_REGEX } from "../constants/regex.js";
import passwordValidation from "../utils/passwordValidation.js";

const Schema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (v) => EMAIL_REGEX.test(v),
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    firstName: {
        type: String,
        lowercase: true,
        required: [true, "First name is required"],
        trim: true,
        validate: {
            validator: (v) => NAME_REGEX.test(v),
            message: (props) => `${props.value} is not a valid first name!`,
        },
    },
    lastName: {
        type: String,
        lowercase: true,
        required: [true, "Last name is required"],
        trim: true,
        validate: {
            validator: (v) => NAME_REGEX.test(v),
            message: (props) => `${props.value} is not a valid last name!`,
        },
    },
    dateOfBirth: {
        type: String,
        required: [true, "Date of birth is required"],
        trim: true,
    }, 
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
        maxlength: 102,
        trim: true,
        validate: {
            validator: (password) => !(passwordValidation.strength(password) !== true),
            message: (props) => `${props.value} is not a valid password!`,
        },
        // select: false,
    },
    phoneNumber: {
        type: String,
        required: [true, "Mobile number is required"],
        unique: true,
        trim: true,
        validate: {
            validator: (v) => PHONE_NUMBER_REGEX.test(v),
            message: (props) => `${props.value} is not a valid mobile number! like +923xxxxxxxxx`,
        },
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    mobileVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: Number,
        default: null,
    },
    otpVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: Object.values(RoleTypes),
        default: RoleTypes.USER,
        required: true,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },

},{ timestamps: true });

// schema methods to campare bcrypt passwords
Schema.methods.bcryptComparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new ApiError("Invalid Details", 500, "Password isn't matching", true);
    }
};
Schema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            print("info", "password is modified");
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (error) {
        throw new ApiError("Invalid Details", 500, "Password saving failed", true);
    }
});

const Users = mongoose.model("users", Schema);

export default Users;
