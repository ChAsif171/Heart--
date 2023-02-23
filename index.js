import cluster from "cluster";
import os from "os";
import ENV from "./src/config/keys.js"
import AppRoutes from "./src/routes/index.js"
import app from "./src/middlewares/appRouteMiddlewares.js";
import print from "./src/utils/print.js";


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
        //const error = new ApiError("API not found", 404, "The api you are trying to access isn't found", true);
        print("API ERROR"," ")
        next(error);
    });



    app.listen(ENV.PORT, () => {
        print("info", `Heart is running on port ${ENV.PORT}`);
        print("info", `This is ${process.env.NODE_ENV} environment.`);
        // DB();
    });
};