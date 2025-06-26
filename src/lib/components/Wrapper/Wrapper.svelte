<script lang="ts">
	import type { Snippet } from "svelte";

	let { children, classes }: { children: Snippet; classes?: string } = $props();
</script>

<div class="mx-auto max-w-[2560px] px-2 sm:px-4 lg:px-8 {classes}">
	{@render children()}
</div>
