# Open Issue Monitor

Open Issue Monitor is an open-source project that allows you to track issues in GitHub open-source repositories with specific labels. It 
periodically checks for new issues, compares them to the previous set of issues, and notifies you of any changes via Telegram.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [How It Works](#how-it-works)
  - [Math Section](#math-section)

## Features

- Track GitHub open-source project issues with selected labels.
- Periodically call the GitHub API to retrieve issue data.
- Compare previous and new issue data to detect changes.
- Notify users of new issues via Telegram.

## Installation

To run Open Issue Monitor, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/0xVikasRushi/OpenIssueMonitor.git
   cd OpenIssueMonitor
2. Install dependencies:
   ```bash
    yarn install
3. Set up your environment variables:
Create a .env file in the project root directory with the following content:
    ```bash
    GITHUB_ACCESS_TOKEN=your_github_access_token
    TELEGRAM_BOT_TOKEN=your_telegram_bot_token
    TELEGRAM_CHAT_ID=your_telegram_chat_id
4. Start the application:
    ```bash
     yarn run dev
## How It Works
### Math Section
To understand how the rate of API requests aligns with the GitHub rate limit, let's break down the calculations:
- GitHub rate limit: 5000 requests per hour
- OpenIssueMointer application sends 1 request every 15 seconds (approximately 4 requests per minute).

#### Calculations:

- Requests per hour by your application: 4 requests/minute * 60 minutes = 240 requests/hour
- OpenIssueMointer application's rate of sending requests is well within the GitHub rate limit, ensuring smooth and uninterrupted operation.
- Once the application is running, it will periodically check for new issues in the GitHub repositories you have configured and notify you via 
Telegram when new issues are detected.

You can also use the `/rate-limit` command in Telegram bot to check the rate limit status of the GitHub API.


