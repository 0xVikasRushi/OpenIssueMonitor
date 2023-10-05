require("dotenv").config();
import cron from "node-cron";
import { getIssues } from "./api";
import { REQUEST_RATE, LABELS } from "./../utils/constant";
import filterIssues from "./../utils/filterIssues";
import { SortedIssue } from "./../types/issues";

let PreviousIssues: SortedIssue[] = [];
let newIssues: SortedIssue[] = [];

cron.schedule(`*/${REQUEST_RATE} * * * * *`, async () => {
  console.count(
    `------------------running a task every ${REQUEST_RATE} seconds------------------------>`
  );
  const formatIssues = await getIssues("facebook", "react");
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
  // console.log("curr " + currentIssues.length);
  // console.log("prec " + PreviousIssues.length);
  // console.log("new " + newIssues.length);
  newIssues.forEach((issue) => {
    console.log({
      url: issue.url,
      label: issue.Requestedlabel,
      AllLabels: issue.originalLabels,
      title: issue.title,
    });
  });
  newIssues = []; // ? Reset the new issues
});
