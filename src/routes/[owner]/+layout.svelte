<script lang="ts">
	import { docDataStore } from "$lib/stores/docData";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import DocsSidebar from "$lib/components/DocsSidebar/DocsSidebar.svelte";
	import Header from "$lib/components/Header/Header.svelte";
	import Wrapper from "$lib/components/Wrapper/Wrapper.svelte";

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
			<Wrapper>
				<div>
					<h1 class="text-3xl font-bold">
						<a href={repoContents.repo.link} target="_blank" rel="noopener noreferrer">
							{repoContents.repo.owner}/{repoContents.repo.name}
						</a>
					</h1>
				</div>
			</Wrapper>
		{/if}
		{@render children?.()}
	</main>
</Sidebar.Provider>
