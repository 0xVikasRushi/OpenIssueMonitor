# Open Issue Monitor
![image](https://github.com/0xVikasRushi/OpenIssueMonitor/assets/88543171/be60de22-56bd-4f70-9877-9b87013feabc)

Open Issue Monitor is a notification system designed for tracking specific GitHub issues. It enables you to monitor issues in open-source GitHub repositories that have specific labels. 


It regularly scans for new issues, compares them to the existing ones, and sends you notifications via Telegram whenever there are updates or changes.

## Table of Contents
- [Problem](#major-problem)
- [Features](#features)
- [How It Works](#how-it-works)
  - [Math Section](#math-section)
- [Installation](#installation)
    - [Create Telegram Bot](https://github.com/0xVikasRushi/OpenIssueMonitor/blob/main/CREATE_BOT.md)
- [Usage](#usage)
- [Self Hosting](#self-hosting)
- Limitations 
## Major Problem
 
If you're someone  actively contribute to open-source projects on GitHub, you know how crucial it is to be one of the first people and get issue assigned to you. 

But when you use GitHub's watch on in repositories, you end up getting a lot of emails. These emails include every discussion and a lot of extra information that you might not actually want or need.

If you're someone who's genuinely interested in contributing to open-source projects, such as through programs like GSOC, then you're in the right place! Welcome to the community.


## Features

- Track GitHub open-source project issues with selected labels.
- Periodically call the GitHub API to retrieve issue data.
- Compare previous and new issue data to detect changes.
- Notify users of new issues via Telegram.

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


## Installation

To run Open Issue Monitor, follow these steps:


1. Clone the repository:

   ```bash
   git clone https://github.com/0xVikasRushi/OpenIssueMonitor
   cd OpenIssueMonitor
2. Install dependencies:
   ```bash
    yarn install
3. Environment Variables
    To run this project, you will need to add the following environment variables to your .env file<br>
    
    `TELEGRAM_BOT_TOKEN=` - [Guide to Create Telegram Access Token](https://github.com/0xVikasRushi/OpenIssueMonitor/blob/main/CREATE_BOT.md) <br>
    `GITHUB_ACCESS_TOKEN` - [Guide to Create Github Access Token](https://docs.github.com/en/enterprise-server@3.6/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) <br>

    Create a .env file in the project root directory with the following content:
      ```bash
      GITHUB_ACCESS_TOKEN=your_github_access_token
      TELEGRAM_BOT_TOKEN=your_telegram_bot_token
      REPO_OWNER=<optional>
      REPO_NAME=<optional>
    
5. Start the application:
    ```bash
     yarn run dev

