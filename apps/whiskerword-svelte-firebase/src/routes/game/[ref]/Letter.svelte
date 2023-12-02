<script lang="ts">
	import { lettersStore, type Letter } from './store';

	export let letter: Letter;
</script>

{#if $lettersStore?.length}
	<button
		class={`btn rounded-sm w-12 h-12 ${letter?.selected ? 'bg-primary-900' : 'bg-primary-500'}`}
		on:click={() =>
			lettersStore.set(
				$lettersStore?.map((l) => (l.index === letter.index ? { ...l, selected: true } : l))
			)}
	>
		{letter?.letter}
	</button>
{/if}
