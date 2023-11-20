import { writable } from "svelte/store";

export const processing = writable<boolean>(false);
