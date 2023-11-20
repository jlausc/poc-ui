<script lang="ts">
  export let sender = "";
  export let text = "";
</script>

<div class="chat {sender == 'user' ? 'chat-start' : 'chat-end'}">
  <div class="chat-bubble">
    {text}
  </div>
</div>
