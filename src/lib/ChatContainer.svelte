<script lang="ts">
  import { cancelled, processing } from "../stores/processing";
  import ChatInput from "./ChatInput.svelte";
  import ChatMessages from "./ChatMessages.svelte";

  $: {
    console.log("processing", processing);
  }
</script>

<h1 class="w-full h-4/6 py-8 px-4 border border-indigo-900 shadow-lg">
  <ChatMessages />

  {#if $processing}
    <button
      class="btn btn-sm btn-secondary absolute right-0 mx-10"
      on:click={() => ($cancelled = true)}>Cancel</button
    >
  {/if}
</h1>

<h1 class="flex h-1/6 py-4 px-6 border border-indigo-900 shadow-lg">
  <ChatInput />
</h1>

<style>
  .breakAll {
    word-break: break-all;
  }
</style>
