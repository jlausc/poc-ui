<script lang="ts">
  import { processing } from "../stores/processing";
  import ChatInput from "./ChatInput.svelte";
  import ChatMessages from "./ChatMessages.svelte";
</script>

<h1 class="w-full h-4/6 py-8 px-4 border border-indigo-900 shadow-lg">
  <ChatMessages />
</h1>

<h1 class="flex h-1/6 py-4 px-4 border border-indigo-900 shadow-lg">
  <ChatInput />
</h1>

<style>
  .breakAll {
    word-break: break-all;
  }
</style>
