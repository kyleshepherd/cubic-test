<script lang="ts">
	import Wrapper from "../Wrapper/Wrapper.svelte";

	let {
		owner,
		name,
		link,
		description,
		diagram,
	}: { owner: string; name: string; link: string; description: string; diagram: string } = $props();
</script>

<Wrapper>
	<div>
		<h1 class="text-3xl font-bold">{owner}/{name}</h1>
	</div>
</Wrapper>
