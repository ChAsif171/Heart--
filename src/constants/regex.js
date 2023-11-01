const EMAIL_REGEX = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
const NAME_REGEX = /^[a-zA-Z]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const PHONE_NUMBER_REGEX = /^\[0-9]{9,}$/;

export {
    EMAIL_REGEX,
    NAME_REGEX,
    PASSWORD_REGEX,
    PHONE_NUMBER_REGEX,
};
