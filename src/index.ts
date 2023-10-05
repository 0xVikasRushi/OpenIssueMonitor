require("dotenv").config();
import cron from "node-cron";
import { REQUEST_RATE } from "./../utils/constant";
import cronJob from "./cronjob";

cron.schedule(`*/${REQUEST_RATE} * * * * *`, async () => {
  // ? Run every REQUEST_RATE seconds (default: 15 seconds)
  await cronJob("EverythingRemindsMeOfHer", "issueTest");
});
