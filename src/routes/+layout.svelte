<script lang="ts">
	import "../app.css";
	let { children } = $props();
	import { ModeWatcher } from "mode-watcher";
	import Header from "$lib/components/Header/Header.svelte";
</script>

<ModeWatcher />
<Header />
{@render children()}
