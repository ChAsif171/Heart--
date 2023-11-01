import BaseError from "./BaseError.js";
import logger from "../logger/index.js";
import fatalLogger from "../logger/fatal.js";

class ErrorHandler {
    /* async*/ handleError(err) {
        logger.error(
            `Error: ${err.message}`,
            err,
        );
        // await sendMailToAdminIfCritical();
        // await sendEventsToSentry();
    }

    handleUncaughtException(error) {
        fatalLogger.fatal(
            `Uncaught Exception: ${error}`,
            error,
        );

        // await sendEmailToDev
    }

    isTrustedError(error) {
        if (error instanceof BaseError) {
            return error.isOperational;
        }
        return false;
    }
}

const errorHandler = new ErrorHandler();

export default errorHandler;
