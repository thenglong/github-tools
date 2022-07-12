import { Octokit } from "@octokit/core";
import "dotenv/config";

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

const owner = "thenglong";
const repo = "nham-avey";

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
