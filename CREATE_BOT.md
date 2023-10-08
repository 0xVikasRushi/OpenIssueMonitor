# How to Create a Telegram Bot and Obtain an Access Token

Before you can use the Open Issue Monitor Telegram bot, you need to create a Telegram bot and obtain an access token. Follow these steps to create a Telegram bot and get the required access token:

1. **Open Telegram and Search for the BotFather:**
   - Open the Telegram app or visit the Telegram website.
   - Search for "BotFather" in the search bar.
<div align="center">
   <img width="280" height="480" alt="BotFather" src="https://github.com/0xVikasRushi/OpenIssueMonitor/assets/88543171/70a012b8-021c-4708-a9d5-4f287027d6dc">
</div>

2. **Start a Chat with BotFather:**

   - Click on the "BotFather" result in the search results.
   - Start a chat with BotFather by clicking on the "Start" or `/start` button.
<div align="center">
   <img width="280" height="480" alt="BotFather" src="https://github.com/0xVikasRushi/OpenIssueMonitor/assets/88543171/7d34d516-bb66-404e-8281-dea6b86e29c7">
</div>
   


2. **Create a New Bot:**

   - To create a new bot, send the following command to BotFather:

     ```
     /newbot
     ```
   - Follow the instructions provided by BotFather. You'll need to choose a name and a username for your bot. The username must end with "bot" (e.g., "OpenIssueMointerBot").

3. **Obtain Your Bot's Access Token:**

   - After successfully creating the bot, BotFather will provide you with an access token. This token is essential for your bot to interact with the Telegram API.
  
<div align="center">
   <img width="280" height="480" alt="BotFather-access-token" src="https://github.com/0xVikasRushi/OpenIssueMonitor/assets/88543171/1b871ad1-5891-4af9-85dc-8dcb331ea266">
</div>
  

5. **Save Your Access Token:**

   - Copy the access token provided by BotFather and keep it in a secure place. You'll need it to configure the Open Issue Monitor application.

Now that you have created your Telegram bot and obtained the access token, you can use it to configure the Open Issue Monitor application as mentioned in the "Installation" section of the documentation.

In your Open Issue Monitor project, you will need to set the `TELEGRAM_BOT_TOKEN` environment variable to the access token you obtained. This allows the application to send notifications and receive commands via your Telegram bot.

```bash
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
