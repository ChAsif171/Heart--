import Queue from "bull";
import KEYS from "../config/keys.js";
import sendSms from "../config/sendSms.js";
import print from "../utils/print.js";

const smsQueue = new Queue("sms", {
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
smsQueue.process(async (job) => {
    try {
        // The value returned by your process function will be stored in the jobs object and can be accessed later on, for example in a listener for the completed event.
        const results = await sendSms(job.data.phoneNumber, job.data.message);
        if (results instanceof Error) {
            throw new Error(results.message);
        }
        return results;
    } catch (error) {
        print("sms-catch", error.message);
        throw new Error(error.message);
    }
});

smsQueue.on("completed", (job, result) => {
    // now by adding return in the process function, we can access the result here given by sendEmail function
    print("sms-queue-job-completed", `Job completed and sms has been sent Results =>`);
    print(`result`, result);
    job.remove();
});

smsQueue.on("failed", (job, err) => {
    print("job-failed", `Job failed : ${err.message} Attempts made : ${job.attemptsMade}`);
    if (job.attemptsMade >= 3) {
        // send notification to admin
        // write log in log file

        // means update the transaction status to failed on the last attempt
        // if (job.attemptsMade === 3) {
        //     const { transactionId } = job.data;
        //     await Transactions.updateOne({ _id: transactionId }, { status: "failed", failedReason: job.failedReason });
        // }
        print("job-removed", "Job removed from queue");
        job.remove(); // will remove the job from queue
    }
});

export default smsQueue;
