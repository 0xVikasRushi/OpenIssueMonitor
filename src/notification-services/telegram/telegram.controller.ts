import TelegramBot from "node-telegram-bot-api";
import {
  CONFIGURATION,
  LABELS,
  REQUEST_RATE,
  SERVER_STATUS,
  setterConfiguration,
  setterRepoInfo,
  setterRequestRate,
  setterServerStatus,
} from "../../../utils/constant";
import { getRateLimit } from "../../api";
import { getRepoOwnerAndName } from "./../../../utils/utils";
import cornServer from "./../../index";

const handleServerStatus = async (bot: TelegramBot, chatId: number) => {
  try {
    await bot.sendMessage(chatId, `Server status: ${SERVER_STATUS}`);
    console.log(`Server status: ${SERVER_STATUS}`);
  } catch (error) {
    console.error(error);
  }
};

const handleStartServer = async (bot: TelegramBot, chatId: number) => {
  let message = `Configure server! Enter the RepoLink to start 🚧`;

  try {
    await bot.sendMessage(chatId, message);
    console.log(message);

    // ? here get the repolink and scrap reponame,repoowner and set the global state
    // ? then start the server

    const repoInfoPromise = new Promise<void>(async (resolve) => {
      bot.once("message", async (msg) => {
        const githubRepoUrlPattern = /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/?/;
        if (!githubRepoUrlPattern.test(msg.text)) {
          message = `Invalid RepoLink! Enter a valid RepoLink to start 🚧`;
          await bot.sendMessage(chatId, message);
          console.log(message);
          resolve();
          return;
        } else {
          const repoInfo = getRepoOwnerAndName(msg.text);
          setterRepoInfo(repoInfo[0], repoInfo[1]);

          const requestedLabels = `${Array.from(LABELS.keys())
            .filter((key) => LABELS.get(key) === true)
            .join(", \n ")}\nREQUEST_RATE : ${REQUEST_RATE}`;
          message = `*CONFIGURATION SUCCESSFUL  ✅*\n *Repository Owner*: ${repoInfo[0]}\n Repository Name: ${repoInfo[1]}\n labels: ${requestedLabels}\n
          `;
          setterConfiguration(message);
          await bot.sendMessage(chatId, message);

          console.log(message);
          cornServer.start();
          setterServerStatus("Started");
          message = `Server started successfully!  ✅ `;
          bot.sendMessage(chatId, message);
          console.log(message);

          resolve();
        }
      });
    });

    await repoInfoPromise;
  } catch (error) {
    console.error(error);
  }
};

const handleStopServer = async (bot: TelegramBot, chatId: number) => {
  try {
    cornServer.stop();
    setterServerStatus("Stopped");
    await bot.sendMessage(chatId, `Server stopped successfully! 🚫 `);
    console.log(`Server stopped successfully! 🚫 `);
  } catch (error) {
    console.error(error);
  }
};

const handleHelp = async (bot: TelegramBot, chatId: number) => {
  try {
    const availableCommands = [
      "/startserver - Start the server",
      "/status - Check server status",
      "/stop - Stop the server",
      "/ratelimit - Get current rate limit",
      "/addLabel - Add label to the server",
      "/getCurrentConfig - Get current configuration",
      "/changeRateLimit - Change rate limit",
      "/help or /start - Display available commands",
    ];
    const helpMessage = "Available commands:\n" + availableCommands.join("\n");
    await bot.sendMessage(chatId, helpMessage);
    console.log("/help Request - Display available commands");
  } catch (error) {
    console.log(error);
  }
};

const handleRateLimit = async (bot: TelegramBot, chatId: number) => {
  try {
    let message;
    if (SERVER_STATUS === "Stopped" || SERVER_STATUS === "Ideal") {
      message = `Server is ${SERVER_STATUS}! Start the server first!`;
      await bot.sendMessage(chatId, message);
      console.log(message);
      return;
    }
    const rate_limit = await getRateLimit();
    message = `Remaining: ${rate_limit.remaining}\nReset time: ${rate_limit.resetTime}`;
    await bot.sendMessage(chatId, message);
  } catch (error) {
    console.log(error);
  }
};

const handleGetCurrentConfig = async (bot: TelegramBot, chatId: number) => {
  try {
    if (SERVER_STATUS === "Stopped" || SERVER_STATUS === "Ideal") {
      await bot.sendMessage(chatId, `Server is ${SERVER_STATUS}! Start the server first!`);
      return;
    }
    await bot.sendMessage(chatId, CONFIGURATION);
  } catch (error) {
    console.error(error);
  }
};

const handleChangeRateLimit = async (bot: TelegramBot, chatId: number) => {
  try {
    bot.sendMessage(chatId, "Enter the new rate limit (3-60 requests per minute)");
    let message = "";
    const rateLimitPromise = new Promise<void>(async (resolve) => {
      bot.once("message", async (msg) => {
        const rate = parseInt(msg.text);

        if (!isNaN(rate) && rate > 4 && rate < 60) {
          cornServer.stop();

          setterRequestRate(rate);
          await bot.sendMessage(
            chatId,
            // ! BUG : HERE RATE LIMIT IS NOT CHANGING IN REQUEST_RATE
            // ! BUT SERVER ITS ACUTALLY CHANGING RUNNING ON NEW RATE LIMIT
            (message = `Rate limit changed successfully! ${REQUEST_RATE} requests per minute ✅`),
          );
          cornServer.start();
        } else {
          await bot.sendMessage(
            chatId,
            (message = `Invaild Rate limit should be between 3 and 60 requests per minute`),
          );
        }
        console.log(message);
        resolve();
      });
    });
    await rateLimitPromise;
  } catch (error) {
    console.error(error);
  }
};

const handleLabel = async (bot: TelegramBot, chatId: number) => {
  if (SERVER_STATUS === "Started") {
    await bot.sendMessage(chatId, "Server is already started! stop the server to Configure");
    return;
  }
  try {
    await bot.sendMessage(chatId, "Enter the label name : ");
    let message = "";
    const handleLabelPromise = new Promise<void>(async (resolve) => {
      bot.once("message", async (msg) => {
        const label = msg.text;
        if (LABELS.has(label) && LABELS.get(label)) {
          await bot.sendMessage(chatId, (message = `Label already existed ✅`));
          resolve();
        } else {
          LABELS.set(label, true);
          await bot.sendMessage(chatId, (message = `Label added successfully ✅`));
          resolve();
        }
        console.log(message);
      });
    });
    await handleLabelPromise;
  } catch (error) {
    console.error(error);
  }
};

export {
  handleChangeRateLimit,
  handleGetCurrentConfig,
  handleHelp,
  handleRateLimit,
  handleServerStatus,
  handleStartServer,
  handleStopServer,
  handleLabel,
};
