import { writable } from "svelte/store";

export type Content = {
	repo: {
		name: string;
		owner: string;
		link: string;
		description: string;
	};
	architectureDiagram: string;
	subsystems: {
		id: string;
		name: string;
		description: string;
		interfaces: {
			name: string;
			type: string;
			location: string;
			link: string;
		}[];
		entryPoints: {
			name: string;
			type: string;
			location: string;
			link: string;
		}[];
		diagram: string;
	}[];
};

export type DocData = {
	repo: string;
	contents: Content;
	createdAt: string;
	updatedAt: string;
};

export const docDataStore = writable<DocData | null>(null);
