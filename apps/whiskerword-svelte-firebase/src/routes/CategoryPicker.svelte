<script lang="ts">
	import { Collection } from 'sveltefire';
	import { setCategory, categoryStore, typeStore } from './store';
	import TypePicker from './TypePicker.svelte';
	import TopicPicker from './TopicPicker.svelte';
	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';

	$: selectedCategory = $categoryStore?.name || '';
</script>

<section class="flex">
	<Collection ref="categories" let:data={categories}>
		<AppRail>
			{#each categories as category}
				<AppRailTile
					bind:group={selectedCategory}
					name={category?.name}
					value={category?.name}
					title={category?.name}
					on:click={() => setCategory(category)}
				>
					<span class="capitalize">{category.name}</span>
				</AppRailTile>
			{/each}
		</AppRail>
	</Collection>

	{#if $categoryStore}
		<div>
			{#key $categoryStore.id}
				<TypePicker categoryRef={$categoryStore.ref.path} />
			{/key}
		</div>
	{/if}
	{#if $typeStore}
		<div>
			{#key $typeStore.id}
				<TopicPicker typeRef={$typeStore.ref.path} />
			{/key}
		</div>
	{/if}
</section>
