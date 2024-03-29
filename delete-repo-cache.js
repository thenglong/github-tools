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

const result = await octokit.request("GET /repos/{owner}/{repo}/actions/caches", {
  owner,
  repo,
});

for (let cache of result.data.actions_caches) {
  await octokit.request("DELETE /repos/{owner}/{repo}/actions/caches/{cache_id}", {
    owner,
    repo,
    cache_id: cache.id,
  });
  console.log(`${cache.key} was deleted!!!`);
}
