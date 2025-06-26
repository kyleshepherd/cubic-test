import { writable } from "svelte/store";

export type DocData = {
	repo: string;
	contentJSON: string;
	createdAt: string;
	updatedAt: string;
};

export const docDataStore = writable<DocData | null>(null);
