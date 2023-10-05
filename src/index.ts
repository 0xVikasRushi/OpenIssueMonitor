require("dotenv").config();
import cron from "node-cron";
import { getIssues } from "./api";
import { REQUEST_RATE, LABELS } from "./../utils/constant";
import filterIssues from "./../utils/filterIssues";

cron.schedule(`*/${REQUEST_RATE} * * * * *`, async () => {
  console.count(
    "------------running a task every 10 seconds--------------------->"
  );

  const formatIssues = await getIssues("asyncapi", "website");
  const filteredIssues = filterIssues(formatIssues, LABELS);
  filteredIssues.forEach((issue) => {
    console.log({
      url: issue.url,
      label: issue.Requestedlabel,
      AllLabels: issue.originalLabels,
      title: issue.title,
    });
  });
});
