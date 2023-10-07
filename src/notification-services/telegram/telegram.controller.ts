import TelegramBot from "node-telegram-bot-api";
import { LABELS, REQUEST_RATE, SERVER_STATUS, setterRepoInfo, setterServerStatus } from "../../../utils/constant";
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
        const repoInfo = getRepoOwnerAndName(msg.text);
        setterRepoInfo(repoInfo[0], repoInfo[1]);

        message = `CONFIGURATION SUCCESSFUL  ✅
        REPOOWNER: ${repoInfo[0]}
        REPONAME: ${repoInfo[1]}
        LABEL : ${Array.from(LABELS.keys()).join(", ")}
        REQUEST_RATE : ${REQUEST_RATE}  
        `;

        await bot.sendMessage(chatId, message);
        console.log(message);

        resolve();
      });
    });

    await repoInfoPromise;
    cornServer.start();
    setterServerStatus("Started");
    message = `Server started successfully!  ✅ `;
    bot.sendMessage(chatId, message);
    console.log(message);
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
      "/ratelimit - Configure rate limit",
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

export { handleHelp, handleRateLimit, handleServerStatus, handleStartServer, handleStopServer };
