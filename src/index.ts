import "dotenv/config";
import cron from "node-cron";
import { REPO_NAME, REPO_OWNER, REQUEST_RATE } from "./../utils/constant";
import issueTracker from "./cornjobs/issueTracker";
import { connectRedis } from "./store/redis-server";

// ? connect to redis and create a config variable to maintain the state
connectRedis();

const cornServer = cron.schedule(
  `*/${REQUEST_RATE} * * * * *`,
  async () => {
    // ?  Run every REQUEST_RATE seconds (default: 15 seconds)
    await issueTracker(REPO_OWNER, REPO_NAME);
  },
  {
    scheduled: false,
  },
);

export default cornServer;
