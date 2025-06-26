<script lang="ts">
	import { docDataStore } from "$lib/stores/docData";
	import RepoInfo from "$lib/components/RepoInfo/RepoInfo.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import DocsSidebar from "$lib/components/DocsSidebar/DocsSidebar.svelte";
	import Header from "$lib/components/Header/Header.svelte";

	let { children } = $props();

	let repoContents = $derived($docDataStore?.contents);
</script>

<Sidebar.Provider>
	{#if repoContents}
		<DocsSidebar content={repoContents} />
	{/if}
	<main class="w-full">
		<Sidebar.Trigger />
		<Header />
		{#if repoContents}
			<RepoInfo
				owner={repoContents.repo.owner}
				name={repoContents.repo.name}
				link={repoContents.repo.link}
				description={repoContents.repo.description}
				diagram={repoContents.architectureDiagram}
			/>
		{/if}
		{@render children?.()}
	</main>
</Sidebar.Provider>
