import { writable } from "svelte/store";

export const requestComplete = writable<boolean>(true);

export const processing = writable<boolean>(false);

export const cancelled = writable<boolean>(false);
