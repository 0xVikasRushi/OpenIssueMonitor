import TelegramBot from "node-telegram-bot-api";
import { getRateLimit } from "../../api";
import { LABELS, REQUEST_RATE, SERVER_STATUS, setterRepoInfo, setterServerStatus } from "../../../utils/constant";
import { getRepoOwnerAndName } from "./../../../utils/utils";
import cornServer from "./../../index";

const sendMessage = async (bot: TelegramBot, chatId: number, message: string) => {
  try {
    await bot.sendMessage(chatId, message);
  } catch (error) {
    console.log(error);
  }
};

const handleServerStatus = async (bot: TelegramBot, chatId: number) => {
  await sendMessage(bot, chatId, `Server status: ${SERVER_STATUS}`);
  console.log(`Server status: ${SERVER_STATUS}`);
};

const handleStartServer = async (bot: TelegramBot, chatId: number) => {
  let message = `Configure server! Enter the RepoLink to start 🚧`;
  await sendMessage(bot, chatId, message);
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

      await sendMessage(bot, chatId, message);
      console.log(message);

      resolve();
    });
  });

  await repoInfoPromise;
  cornServer.start();
  setterServerStatus("Started");
  message = `Server started successfully!  ✅ `;
  sendMessage(bot, chatId, message);
  console.log(message);
};

const handleStopServer = async (bot: TelegramBot, chatId: number) => {
  cornServer.stop();
  setterServerStatus("Stopped");
  await sendMessage(bot, chatId, `Server stopped successfully! 🚫 `);
  console.log(`Server stopped successfully! 🚫 `);
};

const handleHelp = async (bot: TelegramBot, chatId: number) => {
  const availableCommands = [
    "/startserver - Start the server",
    "/status - Check server status",
    "/stop - Stop the server",
    "/ratelimit - Configure rate limit",
    "/help or /start - Display available commands",
  ];
  const helpMessage = "Available commands:\n" + availableCommands.join("\n");
  await sendMessage(bot, chatId, helpMessage);
  console.log("/help Request - Display available commands");
};

const handleRateLimit = async (bot: TelegramBot, chatId: number) => {
  let message;
  if (SERVER_STATUS === "Stopped" || SERVER_STATUS === "Ideal") {
    message = `Server is ${SERVER_STATUS}! Start the server first!`;
    await sendMessage(bot, chatId, message);
    console.log(message);
    return;
  }
  const rate_limit = await getRateLimit();
  message = `Remaining: ${rate_limit.remaining}\nReset time: ${rate_limit.resetTime}`;
  await bot.sendMessage(chatId, message);
};

export { sendMessage, handleServerStatus, handleStartServer, handleStopServer, handleHelp, handleRateLimit };
