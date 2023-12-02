<script>
	import { onMount } from 'svelte';
	import Letter from './Letter.svelte';
	import { letters } from './store';
	export let data;

	onMount(() => {
		letters.set(
			Array.from(data.letters).map((l, i) => {
				return {
					index: i,
					letter: l,
					selected: false
				};
			})
		);
	});
</script>

{#if $letters}
	<div class="flex gap-1">
		{#each $letters as letter}
			<Letter {letter} />
		{/each}
	</div>
{:else}
	Loading letters...
{/if}
