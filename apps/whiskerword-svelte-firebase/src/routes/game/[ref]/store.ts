import { writable } from 'svelte/store';

export interface Letter {
	index: number;
	letter: string;
	selected: boolean;
}
export const letters = writable<Letter[] | undefined>();
