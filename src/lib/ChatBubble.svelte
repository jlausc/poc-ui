<script lang="ts">
  export let sender = "";
  export let text = "";

  let displayText = [text];

  $: {
    if (text.includes("``")) {
      displayText = text.split("```");
    }
  }
</script>

{#if sender == "user"}
  <div class="chat chat-start">
    <div class="chat-bubble chat-bubble-accent">
      {text}
    </div>
  </div>
{:else}
  {#each displayText as t, i}
    {#if i % 2 == 0}
      <div class="chat chat-end">
        <div class="chat-bubble chat-bubble-warning">
          {t.length ? t : "processing ..."}
        </div>
      </div>
    {:else}
      <div class="mockup-code">
        <pre>{t}</pre>
      </div>
    {/if}
  {/each}
{/if}
