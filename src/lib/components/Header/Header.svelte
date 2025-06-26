<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
	import DarkModeSwitcher from "../DarkModeSwitcher/DarkModeSwitcher.svelte";
	import Wrapper from "../Wrapper/Wrapper.svelte";
</script>

<ModeWatcher />
<Wrapper>
	<header class="py-4">
		<div class="flex items-center justify-between">
			<a href="/" class="text-2xl font-bold">DocGen</a>
			<DarkModeSwitcher />
		</div>
	</header>
</Wrapper>
