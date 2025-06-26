import { json } from "@sveltejs/kit";
import OpenAI from "openai";
import { OPENAI_API_KEY } from "$env/static/private";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "$env/static/private";

const client = new OpenAI({
	apiKey: OPENAI_API_KEY,
});
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const GET = async ({ url }) => {
	const repo = url.searchParams.get("repo");
	if (!repo) {
		return json({ error: "No repo provided" }, { status: 400 });
	}
	let responseText: string;
	try {
		const response = await client.responses.create({
			model: "o4-mini",
			input: `Analyse this GitHub repo ${repo} and generate documentation for the repo for the purpose of a repository wiki. Identify high-level subsystems, balancing both feature-driven and technical perspectives—such as key features, user services, authentication flows, data layers, CLI tools, or core architectural components. At the top level, include the repo name, repo owner, link to the repo and a concise description of the repo. Also generate an architecture diagram using Mermaid for the repo. Include a concise description of each subsystem, a list of public interfaces and entry points in the subsystem, each with links back to the specific line(s)/file(s) of the repo. Also generate architecture diagrams using Mermaid for each subsystem. Format the data in the structure of the JSON object below to ensure consistency, so that the wiki layer can consume, giving each subsystem a slug-style ID for routing purposes. Don't include the wrapping \`\`\`json or \`\`\` at the start or end of the response.


			JSON format:
			{
				"repo": {
					"name": "string",
					"owner": "string",
					"link": "string",
					"description": "string",
				},
				"architectureDiagram": "string",
				"subsystems": [
					{
						"id": "string",
						"name": "string",
						"description": "string",
						"interfaces": [
							{
								"name": "string",
								"type": "string",
								"location": "string",
								"link": "string",
							},
						],
						entryPoints: [
							{
								"name": "string",
								"type": "string",
								"location": "string",
								"link": "string",
							},
						],
						diagram: "string",
					}
				]
			}
			`,
		});
		responseText = response.output_text;
		console.log(responseText);
	} catch (error) {
		return json({ error: error }, { status: 500 });
	}
	try {
		const { data, error } = await supabase
			.from("repos")
			.insert({
				name: repo,
				content: responseText,
			})
			.select();
		if (error) {
			return json({ error: error }, { status: 500 });
		}
		return json({ data: data[0] }, { status: 200 });
	} catch (error) {
		return json({ error: error }, { status: 500 });
	}
};
