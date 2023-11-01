import axios from "axios";
import KEYS from "./keys.js";

async function sendSms(to, body) {
    // send to single number
    try {
        const data = { to, body };
        const config = {
            method: "post",
            url: "https://api.bulksms.com/v1/messages",
            data,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${KEYS.BULK_SMS.API_KEY}`,
            },
        };
        const res = await axios(config);
        return res.data;
    } catch (error) {
        throw new Error(error);
    }
}
export default sendSms;

// const data = [
    //     {
    //         to: ["+5764979424", "+27001234567"],
    //         body: "Hello World!",
    //     },
    // ];
