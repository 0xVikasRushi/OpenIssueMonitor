# Open Issue Monitor

![Open Issue Monitor](https://github.com/0xVikasRushi/OpenIssueMonitor/assets/88543171/ea6766ad-ef1c-4ba5-903e-0c5eeb635051)


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
- [Limitations](#limitations)
- [What's Next](#whats-next)
- [License](#license)
- [Feedback](#feedback)

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
- OpenIssueMointer application sends 1 request every 10 seconds (approximately 6 requests per minute).

#### Calculations:

- Requests per hour : 6 requests/minute * 60 minutes = 360 requests/hour
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
## Usage

The Telegram bot offers the following commands to interact with the Open Issue Monitor:

- `/startserver`: Start the server for monitoring GitHub issues.
  - Example usage: `/startserver`
  - Action: Initiates the server for monitoring.

- `/status`: Check the status of the server.
  - Example usage: `/status`
  - Action: Retrieves the current status of the server.

- `/stop`: Stop the server.
  - Example usage: `/stop`
  - Action: Stops the server.

- `/ratelimit`: Check the rate limit status.
  - Example usage: `/ratelimit`
  - Action: Retrieves information about the rate limit.

- `/getCurrentConfig`: Get the current configuration.
  - Example usage: `/getCurrentConfig`
  - Action: Retrieves and displays the current configuration settings.

- `/changeRateLimit`: Change the rate limit settings.
  - Example usage: `/changeRateLimit`
  - Action: Allows changing the rate limit settings.

- `/addLabel`: Add a label to an issue.
  - Example usage: `/addLabel`
  - Action: Provides a way to add labels to GitHub issues.

- `/help` or `/start`: Get help and usage instructions.
  - Example usage: `/help` or `/start`
  - Action: Displays usage instructions and available commands.

- Default: If an invalid or unrecognized command is provided, the bot will display usage instructions.
## Self Hosting
  You have the Free options to self-host the Open Issue Monitor backend for free on various cloud platforms. Here are some recommended free hosting options:
- [Render](https://render.com/)
  Render offers a free tier that allows you to host web applications without incurring costs.
- [Railway](https://railway.app/)
- [Fly.io](https://fly.io/)
- [Amazon EC2 (Free Tier)](https://aws.amazon.com/ec2/)
  Amazon EC2 offers a free tier that allows you to run small virtual servers for free for 12 months.
  
Choose one of these free hosting platforms to deploy your Open Issue Monitor backend without incurring hosting expenses.
Refer to the respective platform's documentation for detailed deployment instructions.

## Limitations

Open Issue Monitor currently has some limitations:

1. **Single Repository Focus:** It can only monitor and provide notifications for a single GitHub repository at a time. If you're involved in multiple projects, you would need to set up separate instances for each repository.

2. **Multi-Label Tracking:** While it can track multiple labels within a repository, it doesn't support tracking across multiple repositories simultaneously. Each instance of Open Issue Monitor is dedicated to a specific repository.

## What's Next

The future development of Open Issue Monitor:

1. **Multiple Repository Support:**  Allowing users to monitor and receive notifications from multiple GitHub repositories within a single instance of the application.
2. **Managed Service Platform:** We are exploring the idea of creating a platform where users can easily subscribe to multiple repositories and select specific labels of interest.
3. **Discord Bot Integration:** To expand our reach and accommodate different communication preferences, we're planning to introduce a Discord bot service alongside the existing Telegram integration.


## License
[MIT](https://github.com/0xVikasRushi/OpenIssueMonitor/blob/main/LICENSE)

## Feedback

Feel free to utilize the code for your own purposes, explore its inner workings, and make it your own. However, we kindly request that you remain mindful of GitHub's rate limit policies when using our application. 
Moreover.

I love constructive criticism! Don't hesitate to roast my code, point out areas for improvement.
Suggest new features and Thanks to [Shubh A Chudasama](https://github.com/c-shubh) helping me out the project.



