<script lang="ts">
	import { Collection } from 'sveltefire';
	import { setTopic, topic } from './store';

	export let typeRef = '';
	$: ref = `${typeRef}/topics`;
	$: selectedTopic = $topic?.name || '';
</script>

<Collection {ref} let:data={topics}>
	{#each topics as topic}
		<button
			class={`btn ${topic?.name === selectedTopic ? 'bg-green-900' : 'bg-green-500'}`}
			on:click={() => setTopic(topic)}>{topic.name}</button
		>
	{/each}
</Collection>
