import { writable } from "svelte/store";

export const uploadedFiles = writable<FileList>();

export const embeddedFiles = writable<any[]>();
