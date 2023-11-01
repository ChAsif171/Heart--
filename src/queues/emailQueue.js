import Queue from "bull";
import KEYS from "../config/keys.js";
import sendEmail from "../config/sendgrid.js";
import print from "../utils/print.js";

const emailQueue = new Queue("email", {
    redis: {
        host: KEYS.REDIS.HOST,
        port: Number(KEYS.REDIS.PORT),
        db: Number(KEYS.REDIS.DB),
    },
    settings: {
        lockDuration: 10000, // used to prevent multiple workers from processing the same job at the same time
        stalledInterval: 5000, // used to detect and automatically fail jobs that have been stalled. This time is used to check the progress of the job and see if it is making any progress. If no progress is made within the specified interval, the job is considered as stalled.
        maxStalledCount: 1, // used to limit the amount of times a stalled job will be re-processed.
        guardInterval: 5000, // used to check for stalled jobs on a per-queue basis instead of every stalledInterval milliseconds.
    },
    limiter: { // maximun 10 jobs in 1sec
        max: 10, // maximum number of jobs that can be processed in a given duration
        duration: 1000, // duration in milliseconds
    },
    defaultJobOptions: {
        removeOnComplete: true, // remove the job from the queue when it has completed
        removeOnFail: true, // remove the job from the queue when it has failed
        attempts: 3, // number of attempts to retry the job
        backoff: {
            type: "fixed", // type of backoff, fixed or exponential
            delay: 5000, // delay in milliseconds
        },
        delay: 10000, // delay in milliseconds
    },
});

// execture the job
emailQueue.process(async (job, done) => {
    try {
        // The value returned by your process function will be stored in the jobs object and can be accessed later on, for example in a listener for the completed event.
        const results = await sendEmail(job.data.email, job.data.subject, job.data.message);
        if (results instanceof Error) {
            throw new Error(results.message);
        }
        done(null, results);
    } catch (error) {
        done(error, null);
    }
});

emailQueue.on("completed", (job, result) => {
    // now by adding return in the process function, we can access the result here given by sendEmail function
    print("email-queue-job-completed", `Job completed and email has been sent Results =>`);
    print("result", result);
    // finally remove the job from the queue
    job.remove();
});

emailQueue.on("failed", (job, err) => {
    print("email-queue-jon-failed", `Job failed with error ${err.message} attempts made ${job.attemptsMade}`);
    if (job.attemptsMade >= 3) {
        // send notification to admin
        // write log in log file
        print("attempts-over", job.attemptsMade);
        print("email-queue-marked-failed", `Job failed with error ${err.message}`);
        job.remove();
    }
});

export default emailQueue;
