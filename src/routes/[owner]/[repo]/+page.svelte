<script lang="ts">
	import { onMount } from "svelte";
	import { docDataStore } from "$lib/stores/docData";
	import type { PageProps } from "./$types";
	import { goto } from "$app/navigation";

	let { data }: PageProps = $props();

	const { owner, repo } = data;

	let repoContents = $derived($docDataStore?.contents);

	onMount(() => {
		if ($docDataStore === null || $docDataStore?.repo !== `${owner}/${repo}`) {
			goto("/");
			return;
		}
	});
</script>
