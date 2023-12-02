<script lang="ts">
	import { Collection } from 'sveltefire';
	import { categoryStore, setTopic, topicStore, typeStore } from './store';
	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';

	const startGame = () => {
		window.location.href = `/game/${$categoryStore?.id},${$typeStore?.id},${$topicStore?.id}`;
	};

	export let typeRef = '';
	$: ref = `${typeRef}/topics`;
	$: selectedTopic = $topicStore?.name || '';
</script>

<Collection {ref} let:data={topics}>
	<AppRail>
		{#each topics as topic}
			<AppRailTile
				bind:group={selectedTopic}
				name={topic?.name}
				value={topic?.name}
				title={topic?.name}
				on:click={() => setTopic(topic)}
			>
				<span class="capitalize" on:click={() => startGame()}>{topic.name}</span>
			</AppRailTile>
		{/each}
	</AppRail>
</Collection>
