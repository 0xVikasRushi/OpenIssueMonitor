import TelegramBot from "node-telegram-bot-api";
import { TELEGRAM_ACCESS_TOKEN } from "./constant";
import { getRateLimit } from "./../src/api";

console.log("Telegram bot server started...");
const bot = new TelegramBot(TELEGRAM_ACCESS_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  if (msg.text === "/rate-limit") {
    const rate_limit = await getRateLimit();
    bot.sendMessage(
      msg.chat.id,
      `Remaining: ${rate_limit.remaining}\nReset time: ${rate_limit.resetTime}`
    );
  }
});

export default bot;
