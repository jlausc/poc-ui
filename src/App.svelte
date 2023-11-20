<script lang="ts">
  import ChatContainer from "./lib/ChatContainer.svelte";
</script>

<div class="w-full h-full breakout">
  <ChatContainer />
</div>

<style>
  .breakout {
    overflow: auto;
    position: absolute;
    left: 0;
    right: 0;
  }
</style>
