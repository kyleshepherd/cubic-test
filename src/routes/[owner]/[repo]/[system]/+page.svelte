<script lang="ts">
	import { onMount } from "svelte";
	import { docDataStore } from "$lib/stores/docData";
	import type { PageProps } from "./$types";
	import { goto } from "$app/navigation";
	import Wrapper from "$lib/components/Wrapper/Wrapper.svelte";
	import Diagram from "$lib/components/Diagram/Diagram.svelte";

	let { data }: PageProps = $props();

	const { owner, repo, system } = $derived(data);

	let repoContents = $derived($docDataStore?.contents);

	let subsystem = $derived(repoContents?.subsystems?.find(s => s.id === system));

	onMount(() => {
		if ($docDataStore === null || $docDataStore?.repo !== `${owner}/${repo}`) {
			goto("/");
			return;
		}
		if (subsystem === undefined) {
			goto(`/${owner}/${repo}`);
			return;
		}
	});
</script>

{#key subsystem}
	{#if subsystem}
		<Wrapper>
			<div class="mt-4">
				<p class="mb-4 text-lg">{subsystem.name}</p>
				<p class="mb-4">{subsystem.description}</p>
				<Diagram diagram={subsystem.diagram} />
			</div>

			{#if subsystem.interfaces.length > 0}
				<div class="mt-4">
					<p class="mb-4 text-lg">Interfaces</p>
					<ul>
						{#each subsystem.interfaces as i}
							<li>
								<a href={i.link} class="underline" target="_blank" rel="noopener noreferrer">
									{i.name} - {i.type} - {i.location}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			{#if subsystem.entryPoints.length > 0}
				<div class="mt-4">
					<p class="mb-4 text-lg">Entry Points</p>
					<ul>
						{#each subsystem.entryPoints as e}
							<li>
								<a href={e.link} class="underline" target="_blank" rel="noopener noreferrer">
									{e.name} - {e.type} - {e.location}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</Wrapper>
	{/if}
{/key}
