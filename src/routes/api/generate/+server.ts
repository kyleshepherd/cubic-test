import { json } from "@sveltejs/kit";
import OpenAI from "openai";
import { OPENAI_API_KEY } from "$env/static/private";
const client = new OpenAI({
	apiKey: OPENAI_API_KEY,
});

export const GET = async ({ url }) => {
	const repo = url.searchParams.get("repo");
	if (!repo) {
		return json({ error: "No repo provided" }, { status: 400 });
	}
	const response = await client.responses.create({
		model: "o4-mini",
		input: `Analyse this GitHub repo ${repo} and generate documentation for the repo for the purpose of a repository wiki. Identify high-level subsystems, balancing both feature-driven and technical perspectives—such as key features, user services, authentication flows, data layers, CLI tools, or core architectural components. At the top level, include the repo name, link to the repo and a concise description of the repo. Include a concise description of each subsystem, a list of public interfaces and entry points, each with links back to the specific line(s)/file(s) of the repo. Also generate architecture diagrams for each subsystem. Put this data into a JSON object that the wiki layer can consume, given each subsystem a slug-style ID for routing.`,
	});
	console.log(response.output_text);
	return json("success", { status: 200 });
};
