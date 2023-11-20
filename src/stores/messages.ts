import { writable } from "svelte/store";

export const modelMessages = writable<string[]>([]);

export const userMessages = writable<string[]>([]);

export const messages = writable<string[]>([
  "Welcome! Enter a prompt to start",
]);

export const message = writable<string>("");
