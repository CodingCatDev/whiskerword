import type { DocumentData } from 'firebase/firestore';
import { writable } from 'svelte/store';

export const categoryStore = writable<DocumentData | undefined>();
export const typeStore = writable<DocumentData | undefined>();
export const topicStore = writable<DocumentData | undefined>();

export const setCategory = (d: DocumentData) => {
	categoryStore.set(d);
	typeStore.set(undefined);
	topicStore.set(undefined);
};
export const setType = (d: DocumentData) => {
	typeStore.set(d);
	topicStore.set(undefined);
};
export const setTopic = (d: DocumentData) => {
	topicStore.set(d);
};
