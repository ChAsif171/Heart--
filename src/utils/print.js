const print = (type, message) => {
    console.log(`[${type.toUpperCase()}]: ${typeof message === "string" ? message : ""}`, typeof message !== "string" ? message : "");
};

export default print;
