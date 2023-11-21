<script lang="ts">
  import ChatContainer from "./lib/ChatContainer.svelte";
  import TopNav from "./lib/TopNav.svelte";
</script>

<div class="w-full h-full breakout">
  <TopNav />
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
