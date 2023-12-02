<script lang="ts">
	import { letters, type Letter } from './store';

	export let letter: Letter;
</script>

{#if $letters && $letters.length}
	<button
		class={`btn rounded-sm p-8 ${letter?.selected ? 'bg-primary-900' : 'bg-primary-500'}`}
		on:click={() =>
			letters.set($letters?.map((l) => (l.index === letter.index ? { ...l, selected: true } : l)))}
	>
		{letter?.letter}
	</button>
{/if}
