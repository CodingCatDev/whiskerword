import { writable } from 'svelte/store';

export interface Letter {
	index: number;
	letter: string;
	selected: boolean;
}
export const lettersStore = writable<Letter[] | undefined>();
