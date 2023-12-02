<script lang="ts">
	import { Collection } from 'sveltefire';
	import { setCategory, category, type } from './store';
	import TypePicker from './TypePicker.svelte';
	import TopicPicker from './TopicPicker.svelte';

	$: selectedCategory = $category?.name || '';
</script>

<section class="flex gap-8">
	<Collection ref="categories" let:data={categories}>
		<div class="flex flex-col gap-1">
			{#each categories as category}
				<button
					class={`btn ${category?.name === selectedCategory ? 'bg-purple-900' : 'bg-purple-500'}`}
					on:click={() => setCategory(category)}>{category.name}</button
				>
			{/each}
		</div>
	</Collection>

	{#if $category}
		<div>
			{#key $category.id}
				<TypePicker categoryRef={$category.ref.path} />
			{/key}
		</div>
	{/if}
	{#if $type}
		<div>
			{#key $type.id}
				<TopicPicker typeRef={$type.ref.path} />
			{/key}
		</div>
	{/if}
</section>
