<script lang="ts">
	import { Collection } from 'sveltefire';
	import { setType, type } from './store';

	export let categoryRef = '';
	$: ref = `${categoryRef}/types`;
	$: selectedType = $type?.name || '';
</script>

<Collection {ref} let:data={types}>
	{#each types as type}
		<button
			class={`btn ${type?.name === selectedType ? 'bg-blue-900' : 'bg-blue-500'}`}
			on:click={() => setType(type)}>{type.name}</button
		>
	{/each}
</Collection>
