<script>
	import { onMount } from 'svelte';
	import Letter from './Letter.svelte';
	import { lettersStore } from './store';
	export let data;

	onMount(() => {
		reset();
	});

	const reset = () => {
		lettersStore.set(
			Array.from(data.letters).map((l, i) => {
				return {
					index: i,
					letter: l,
					selected: false
				};
			})
		);
	};
	const shuffle = () => {
		lettersStore.set($lettersStore?.sort(() => Math.random() - 0.5));
	};
	const submit = () => {
		lettersStore.set($lettersStore?.sort(() => Math.random() - 0.5));
	};
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		{#if $lettersStore}
			<div class="flex flex-wrap justify-center gap-2">
				{#each $lettersStore as letter}
					<Letter {letter} />
				{/each}
			</div>
			<div class="flex gap-2">
				<button class="btn variant-outline-primary" on:click={() => reset()}>Unselect All</button>
				<button class="btn variant-outline-primary" on:click={() => shuffle()}>Shuffle</button>
				<button class="btn variant-filled-primary" on:click={() => submit()}>Submit</button>
			</div>
		{:else}
			Loading letters...
		{/if}
	</div>
</div>
