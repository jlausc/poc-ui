<script lang="ts">
  import ChatBubble from "./ChatBubble.svelte";
  import { afterUpdate } from "svelte";
  import { messages } from "../stores/messages";

  let element: HTMLDivElement;

  afterUpdate(() => {
    if ($messages) scrollToBottom(element);
  });

  $: if ($messages && element) {
    scrollToBottom(element);
  }

  const scrollToBottom = async (node: HTMLDivElement) => {
    node.scroll({ top: node.scrollHeight, behavior: "smooth" });
  };
</script>

<div class="max-h-full overflow-auto" bind:this={element}>
  {#each $messages as txt, i}
    <ChatBubble sender={i % 2 == 0 ? "model" : "user"} text={txt} />
  {/each}
  <!-- 
  // {#each $userMessages as txt}
  //   <ChatBubble sender={"user"} text={txt} />
  // {/each} -->
</div>
