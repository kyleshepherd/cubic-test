import { json } from "@sveltejs/kit";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "$env/static/private";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const GET = async ({ url }) => {
	const repo = url.searchParams.get("repo");
	if (!repo) {
		return json({ error: "No repo provided" }, { status: 400 });
	}
	try {
		const { data, error } = await supabase.from("repos").select("*").eq("name", repo).limit(1);
		if (error) {
			return json({ error: "Failed to query db for repo" }, { status: 500 });
		}
		if (data.length < 1) {
			return json(null, { status: 200 });
		}
		return json({ data: data[0] }, { status: 200 });
	} catch {
		return json({ error: "Failed to query db for repo" }, { status: 500 });
	}
};
