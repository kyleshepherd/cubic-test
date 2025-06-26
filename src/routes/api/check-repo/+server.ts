import { json } from "@sveltejs/kit";
import { Octokit } from "@octokit/core";
import { GITHUB_TOKEN } from "$env/static/private";

export const GET = async ({ url }) => {
	const repo = url.searchParams.get("repo");
	if (!repo) {
		return json({ error: "No repo provided" }, { status: 400 });
	}
	try {
		const octokit = new Octokit({
			auth: GITHUB_TOKEN,
		});

		const resp = await octokit.request(`GET /repos/${repo}`, {
			owner: repo.split("/")[0],
			repo: repo.split("/")[1],
			headers: {
				"X-GitHub-Api-Version": "2022-11-28",
			},
		});
		if (resp.data.visibility === "public") {
			return json("success", { status: 200 });
		}
		return json(
			{ error: "Failed to check repo, make sure the the repo is public" },
			{ status: 500 },
		);
	} catch (error) {
		console.error(error);
		return json(
			{ error: "Failed to check repo, make sure the the repo is public" },
			{ status: 500 },
		);
	}
};
