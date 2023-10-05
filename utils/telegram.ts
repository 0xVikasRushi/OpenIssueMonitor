import TelegramBot from "node-telegram-bot-api";
import { TELEGRAM_ACCESS_TOKEN } from "./constant";

console.log("Telegram bot server started...");
const bot = new TelegramBot(TELEGRAM_ACCESS_TOKEN, { polling: true });

export default bot;
