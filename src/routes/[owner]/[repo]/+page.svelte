<script lang="ts">
	import { onMount } from "svelte";
	import { docDataStore } from "$lib/stores/docData";
	import type { PageProps } from "./$types";
	import { goto } from "$app/navigation";
	import Wrapper from "$lib/components/Wrapper/Wrapper.svelte";
	import Diagram from "$lib/components/Diagram/Diagram.svelte";

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

<Wrapper>
	{#if repoContents}
		<div class="mt-4">
			<p class="mb-4">{repoContents.repo.description}</p>
			<Diagram diagram={repoContents.architectureDiagram} />
		</div>
	{/if}
</Wrapper>
