// check for empty fields in the object
const checkEmptyFields = (fieldsObj) => {
    if (Object.keys(fieldsObj).length <= 0) return false;
    return Object.keys(fieldsObj).every((fieldName) => !["", undefined, null].includes(fieldsObj[fieldName]));
};

export default checkEmptyFields;
