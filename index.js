import cluster from "cluster";
import os from "os";
import ENV from "./src/config/keys.js"
import AppRoutes from "./src/routes/index.js"
import app from "./src/middlewares/appRouteMiddlewares.js";
import print from "./src/utils/print.js";
import DB from "./src/config/db.js";
import { ApiError } from "./src/utils/ApiError.js";
import errorHandler from "./src/utils/Errorhandler.js"


    app.use("/api/v1/", AppRoutes);

    // route not found
    app.use((req, res, next) => {
        const error = new ApiError("API not found", 404, "The api you are trying to access isn't found", true);
        print("API ERROR"," ")
        next(error);
    });
    app.listen(ENV.PORT, () => {
        print("info", `Heart is running on port ${ENV.PORT}`);
        print("info", `This is ${process.env.NODE_ENV} environment.`);
         DB();
    });