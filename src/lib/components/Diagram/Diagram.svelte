<script lang="ts">
	import mermaid from "mermaid";
	import Wrapper from "../Wrapper/Wrapper.svelte";
	import { onMount } from "svelte";

	let { diagram }: { diagram: string } = $props();

	let diagramRef = $state<HTMLSpanElement | null>(null);

	onMount(async () => {
		if (diagramRef === null) return;
		const { svg } = await mermaid.render("mermaid", diagram);
		diagramRef.innerHTML = svg;
	});
</script>

<h2 class="font-semi mb-2 text-lg">Architecture Diagram</h2>
<span bind:this={diagramRef}></span>
