<script lang="ts">
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	import * as Alert from "$lib/components/ui/alert/index.js";
	import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";
	import { docDataStore } from "$lib/stores/docData";
	import { goto } from "$app/navigation";
	import Header from "$lib/components/Header/Header.svelte";

	let repoUrl = $state("");
	let error = $state("");
	let isLoading = $state(false);

	async function handleSubmit(event: Event) {
		event.preventDefault();
		isLoading = true;
		error = "";
		const url = new URL(repoUrl);
		// check if the url is a valid github repo
		if (url.hostname !== "github.com" || url.pathname.split("/").length !== 3) {
			error = "Invalid GitHub repo URL";
			isLoading = false;
			return;
		}
		const repo = url.pathname.substring(1).toLowerCase();
		// check if repo is public via GitHub API
		const response = await fetch(`/api/verify-repo?repo=${repo}`);
		if (response.status !== 200) {
			error = "Failed to check repo, make sure the the repo is public";
			isLoading = false;
			return;
		}
		// check if repo is already in db, if so fetch the data
		const dbResponse = await fetch(`api/db-repo-fetch?repo=${repo}`);
		const body = await dbResponse.json();
		let docData: any | null = body?.data || null;
		if (docData === null) {
			// use OpenAI to generate docs data
			const genResponse = await fetch(`api/generate?repo=${repo}`);
			const genBody = await genResponse.json();
			docData = genBody.data;
		}
		if (docData !== null) {
			docDataStore.set({
				repo: docData.name,
				createdAt: docData.created_at,
				updatedAt: docData.updated_at,
				contents: JSON.parse(docData.content),
			});
			goto(`/${repo}`);
			isLoading = false;
		} else {
			docDataStore.set(null);
			error = "Failed to generate docs, please try again";
			isLoading = false;
			return;
		}
		isLoading = false;
	}
</script>

<Header />

<div class="flex min-h-screen flex-col items-start px-4 pt-24">
	{#if error}
		<Alert.Root class="mx-auto mb-4 w-full max-w-md" variant="destructive">
			<AlertCircleIcon />
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>{error}</Alert.Description>
		</Alert.Root>
	{/if}
	<form
		onsubmit={handleSubmit}
		class="bg-card text-card-foreground mx-auto w-full max-w-md space-y-4 rounded-lg p-8 shadow-lg"
	>
		<p class="text-lg font-medium">
			Enter a repo URL to generate (or fetch already generated) docs
		</p>
		<label for="repo-url" class="block">GitHub Repository URL</label>
		<Input
			id="repo-url"
			type="url"
			placeholder="https://github.com/user/repo"
			bind:value={repoUrl}
			required
			class="w-full"
		/>
		<p class="text-xs">This must be a public GitHub repo</p>
		<Button type="submit" class="mt-2 w-full" disabled={isLoading}>
			{isLoading ? "Generating..." : "Generate"}
		</Button>
	</form>
</div>
