import TelegramBot from "node-telegram-bot-api";
import {
  LABELS,
  REQUEST_RATE,
  SERVER_STATUS,
  TELEGRAM_ACCESS_TOKEN,
  setterRepoInfo,
  setterServerStatus,
} from "./constant";
import { getRateLimit } from "./../src/api";
import cornServer from "./../src";
import { getRepoInfo } from "./utils";

console.log("... Telegram bot server started ...");
const bot = new TelegramBot(TELEGRAM_ACCESS_TOKEN, { polling: true });

const sendMessage = async (chatId: number, message: string) => {
  try {
    await bot.sendMessage(chatId, message);
  } catch (error) {
    console.log(error);
  }
};

const handleRateLimit = async (chatId: number) => {
  let message;
  if (SERVER_STATUS === "Stopped" || SERVER_STATUS === "Ideal") {
    message = `Server is ${SERVER_STATUS}! Start the server first!`;
    await sendMessage(chatId, message);
    console.log(message);
    return;
  }
  const rate_limit = await getRateLimit();
  message = `Remaining: ${rate_limit.remaining}\nReset time: ${rate_limit.resetTime}`;
  await bot.sendMessage(chatId, message);
};

const handleStartServer = async (chatId: number) => {
  let message = `Configure server! Enter the RepoLink to start 🚧`;
  await sendMessage(chatId, message);
  console.log(message);
  // ? here get the repolink and scrap reponame,repoowner and set the global state
  // ? then start the server
  const repoInfoPromise = new Promise<void>(async (resolve) => {
    bot.once("message", async (msg) => {
      const repoInfo = getRepoInfo(msg.text);
      setterRepoInfo(repoInfo[0], repoInfo[1]);

      message = `CONFIGURATION SUCCESSFUL  ✅
      REPOOWNER: ${repoInfo[0]}
      REPONAME: ${repoInfo[1]}
      LABEL : ${Array.from(LABELS.keys())}
      REQUEST_RATE : ${REQUEST_RATE}  
      `;

      await sendMessage(chatId, message);
      console.log(message);

      resolve();
    });
  });

  await repoInfoPromise;
  cornServer.start();
  setterServerStatus("Started");
  message = `Server started successfully!  ✅ `;
  sendMessage(chatId, message);
  console.log(message);
};

const handleStopServer = async (chatId: number) => {
  cornServer.stop();
  setterServerStatus("Stopped");
  await sendMessage(chatId, `Server stopped successfully! 🚫 `);
  console.log(`Server stopped successfully! 🚫 `);
};

const handleServerStatus = async (chatId: number) => {
  await sendMessage(chatId, `Server status: ${SERVER_STATUS}`);
  console.log(`Server status: ${SERVER_STATUS}`);
};
const handleHelp = async (chatId: number) => {
  const availableCommands = [
    "/start - Start the server",
    "/status - Check server status",
    "/stop - Stop the server",
    "/ratelimit - Configure rate limit",
    "/help - Display available commands",
  ];
  const helpMessage = "Available commands:\n" + availableCommands.join("\n");
  await sendMessage(chatId, helpMessage);
  console.log("/help Request - Display available commands");
};

bot.on("message", async (msg) => {
  switch (msg.text) {
    case "/start":
      handleStartServer(msg.chat.id);
      break;
    case "/status":
      handleServerStatus(msg.chat.id);
      break;
    case "/stop":
      handleStopServer(msg.chat.id);
      break;
    case "/ratelimit":
      handleRateLimit(msg.chat.id);
      break;
    case "/help":
      handleHelp(msg.chat.id);
      break;
    default:
      handleHelp(msg.chat.id);
      break;
  }
});

export default bot;
