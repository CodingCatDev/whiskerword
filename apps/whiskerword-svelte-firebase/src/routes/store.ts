import type { DocumentData } from 'firebase/firestore';
import { writable } from 'svelte/store';

export const category = writable<DocumentData | undefined>();
export const type = writable<DocumentData | undefined>();
export const topic = writable<DocumentData | undefined>();

export const setCategory = (d: DocumentData) => {
	category.set(d);
	type.set(undefined);
	topic.set(undefined);
};
export const setType = (d: DocumentData) => {
	type.set(d);
	topic.set(undefined);
};
export const setTopic = (d: DocumentData) => {
	topic.set(d);
};
