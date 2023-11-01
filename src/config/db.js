import mongoose from "mongoose";
import ENV from "./keys.js";
import print from "../utils/print.js";

const DB = async () => {
    try {
        mongoose.set("strictQuery", false);

        await mongoose.connect(ENV.DATABASE.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        print("info", `MongoDB Connected...`);
    } catch (error) {
        print("error", `${error.message}`);
        process.exit(1);
    }
};

export default DB;
