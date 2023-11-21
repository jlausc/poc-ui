<script lang="ts">
  export let sender = "";
  export let text = "";
</script>

{#if sender == "user"}
  <div class="chat chat-start">
    <div class="chat-bubble">
      {text}
    </div>
  </div>
{:else}
  <div class="chat chat-end">
    <div class="chat-bubble">
      {text.length ? text : "processing ..."}
    </div>
  </div>
{/if}
