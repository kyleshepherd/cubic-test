<script lang="ts">
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	import * as Alert from "$lib/components/ui/alert/index.js";
	import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";

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
		const repo = url.pathname.substring(1);
		// check if repo is public via GitHub API
		const response = await fetch(`/api/verify-repo?repo=${repo}`);
		if (response.status !== 200) {
			error = "Failed to check repo, make sure the the repo is public";
			isLoading = false;
			return;
		}
		// use OpenAI to generate docs data
		const dbResponse = await fetch(`api/generate?repo=${repo}`);
		isLoading = false;
	}
</script>

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
		<Button type="submit" class="mt-2 w-full" disabled={isLoading}>Submit</Button>
	</form>
</div>
