import { SortedIssue } from "../@types/issues";
import { LABELS, REQUEST_RATE } from "./../utils/constant";
import filterIssues from "./../utils/filterIssues";
import bot from "./../utils/telegram";
import { getIssues } from "./api";

let PreviousIssues: SortedIssue[] = [];
let newIssues: SortedIssue[] = [];

const cronJob = async (repoOwner: string, repoName: string) => {
  console.count(
    `------------------running a task every ${REQUEST_RATE} seconds------------------------>`
  );
  const formatIssues = await getIssues(repoOwner, repoName);
  const currentIssues = filterIssues(formatIssues, LABELS);

  // ? Check if the length of the previous issues is less than the current issues
  if (PreviousIssues.length === 0) {
    PreviousIssues = currentIssues;
  } else {
    if (PreviousIssues.length === currentIssues.length - 1) {
      // ? Number of issue increased by only one issue (new issue)
      for (let i = 0; i < currentIssues.length; i++) {
        if (PreviousIssues[i].url !== currentIssues[i].url) {
          newIssues.push(currentIssues[i]);
          PreviousIssues = currentIssues;
          break;
        }
      }
    }
  }

  if (newIssues.length > 0) {
    newIssues.forEach((issue) => {
      console.log({
        url: issue.url,
        label: issue.Requestedlabel,
        AllLabels: issue.originalLabels,
        title: issue.title,
      });

      bot.sendMessage(
        process.env.TELEGRAM_CHAT_ID,
        `New issue: ${issue.Requestedlabel} \n${issue.url}`
      );
    });
    newIssues = []; // ? Reset the new issues
  }
};

export default cronJob;
