require("dotenv").config();
import cron from "node-cron";
import { getIssues } from "./api";

cron.schedule("*/10 * * * * *", async () => {
  console.count(
    "running a task every 10 seconds------------------------------------>"
  );
  const isssues = await getIssues("facebook", "react");
  console.log(isssues.length);
});
