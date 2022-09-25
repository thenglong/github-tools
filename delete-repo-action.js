import { Octokit } from "@octokit/core";
import "dotenv/config";
import process from "process";

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

const owner = "thenglong";
const repo = process.argv[2];

if (!repo) {
  console.log("repo name is required");
  process.exit(1);
}

const result = await octokit.request("GET /repos/{owner}/{repo}/actions/runs", {
  owner,
  repo,
});

console.log(result.data.workflow_runs);

for (let run of result.data.workflow_runs) {
  await octokit.request("DELETE /repos/{owner}/{repo}/actions/runs/{run_id}", {
    owner,
    repo,
    run_id: run.id,
  });
  console.log(`${run.id} was deleted!!!`);
}
