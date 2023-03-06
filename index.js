import cluster from "cluster";
import os from "os";
import ENV from "./src/config/keys.js"
import AppRoutes from "./src/routes/index.js"
import app from "./src/middlewares/appRouteMiddlewares.js";
import print from "./src/utils/print.js";
import DB from "./src/config/db.js";
import { ApiError } from "./src/utils/ApiError.js";
import errorHandler from "./src/utils/Errorhandler.js"

if (cluster.isPrimary && process.env.NODE_ENV === "production") {
    const cpus=os.cpus().length;
    print("info",`Forking for ${cpus} CPUs`);

    for(let i=0;i<cpus;i++){
        cluster.fork();
    }
    cluster.on("exit", (worker) => {
        print("info", `worker ${worker.process.pid} died`);
        cluster.fork();
    });
}else{
    // apis
    app.use("/api/v1/", AppRoutes);

    // route not found
    app.use((req, res, next) => {
        const error = new ApiError("API not found", 404, "The api you are trying to access isn't found", true);
        print("API ERROR"," ")
        next(error);
    });
    app.use((err, req, res, next) => {
        print("error", `Handeling error: ${err?.message}`);
        if (!errorHandler.isTrustedError(err)) {
            next(err);
        }
        errorHandler.handleError(err);
        print("error", `returing: ${err?.message}`);
        return res.status(err?.httpCode ?? 500).json({
            name: err.name,
            status: err?.httpCode ?? 500,
            success: false,
            error: true,
            message: err?.message,
        });
    });

    // uncaughtException and unhandledRejection
    process.on("uncaughtException", async (error) => { // Uncaught Exception occurs when an exception is not caught by a programming construct or by the programmer,
        print("error", `uncaughtException : ${error.message}`);
        await errorHandler.handleUncaughtException(error);
        throw new Error(error.message);
        // process.exit(1);
    });

    process.on("unhandledRejection", async (error) => { // The unhandledrejection event is sent to the global scope of a script when a JavaScript Promise that has no rejection handler is rejected;
        print("error", `unhandledRejection : ${error.message}`);
        await errorHandler.handleUncaughtException(error);
        // process.exit(1);
    });


    app.listen(ENV.PORT, () => {
        print("info", `Heart is running on port ${ENV.PORT}`);
        print("info", `This is ${process.env.NODE_ENV} environment.`);
         DB();
    });
};