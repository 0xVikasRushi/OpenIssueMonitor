require("dotenv").config();
import cron from "node-cron";
import { REPO_NAME, REPO_OWNER, REQUEST_RATE } from "./../utils/constant";
import cronJob from "./cronjob";

const cornServer = cron.schedule(
  `*/${REQUEST_RATE} * * * * *`,
  async () => {
    // ?  Run every REQUEST_RATE seconds (default: 15 seconds)
    await cronJob(REPO_OWNER, REPO_NAME);
  },
  {
    scheduled: false,
  }
);

export default cornServer;
