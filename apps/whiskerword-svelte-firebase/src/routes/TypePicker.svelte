<script lang="ts">
	import { Collection } from 'sveltefire';
	import { setType, typeStore } from './store';
	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';

	export let categoryRef = '';
	$: ref = `${categoryRef}/types`;
	$: selectedType = $typeStore?.name || '';
</script>

<Collection {ref} let:data={types}>
	<AppRail>
		{#each types as type}
			<AppRailTile
				bind:group={selectedType}
				name={type?.name}
				value={type?.name}
				title={type?.name}
				on:click={() => setType(type)}
			>
				<span class="capitalize">{type.name}</span>
			</AppRailTile>
		{/each}
	</AppRail>
</Collection>
