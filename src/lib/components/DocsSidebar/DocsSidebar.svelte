<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { Content } from "$lib/stores/docData";

	let { content }: { content: Content } = $props();
</script>

<Sidebar.Root>
	<Sidebar.Header />
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.Menu>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton>
						{#snippet child({ props })}
							<a
								href="/{content.repo.owner.toLowerCase()}/{content.repo.name.toLowerCase()}"
								{...props}
							>
								{content.repo.owner}/{content.repo.name}
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
				{#each content.subsystems as subsystem (subsystem.id)}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton>
							{#snippet child({ props })}
								<a
									href="/{content.repo.owner.toLowerCase()}/{content.repo.name.toLowerCase()}/{subsystem.id.toLowerCase()}"
									{...props}
								>
									{subsystem.name}
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer />
</Sidebar.Root>
