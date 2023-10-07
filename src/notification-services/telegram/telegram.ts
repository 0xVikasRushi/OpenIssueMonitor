import TelegramBot from "node-telegram-bot-api";
import { TELEGRAM_ACCESS_TOKEN } from "../../../utils/constant";
import {
  handleHelp,
  handleRateLimit,
  handleServerStatus,
  handleStartServer,
  handleStopServer,
  handleGetCurrentConfig,
} from "./telegram.controller";

console.log("... Telegram bot server started ...");
const Telegrambot = new TelegramBot(TELEGRAM_ACCESS_TOKEN, { polling: true });

Telegrambot.on("message", async (msg) => {
  switch (msg.text) {
    case "/startserver":
      handleStartServer(Telegrambot, msg.chat.id);
      break;
    case "/status":
      handleServerStatus(Telegrambot, msg.chat.id);
      break;
    case "/stop":
      handleStopServer(Telegrambot, msg.chat.id);
      break;
    case "/ratelimit":
      handleRateLimit(Telegrambot, msg.chat.id);
      break;
    case "/getCurrentConfig":
      handleGetCurrentConfig(Telegrambot, msg.chat.id);
      break;

    case "/help" || "/start":
      // ? telegram bot start
      handleHelp(Telegrambot, msg.chat.id);
      break;
    default:
      handleHelp(Telegrambot, msg.chat.id);
      break;
  }
});

export default Telegrambot;
