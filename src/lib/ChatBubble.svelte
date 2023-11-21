<script lang="ts">
  import { code } from "../stores/model";

  export let sender = "";
  export let text = "";

  const ex = /^(\d+)([.][ ])|([*][ ])|([-][ ])/gm;

  const regex = new RegExp(ex, "gm");

  $: displayText = [text];

  $: {
    console.log("TEXT: ", text, displayText);
    if (text.includes("```")) {
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
      {#if !t.length}
        <!-- Message for empty text -->
        <div class="chat chat-end">
          <div class="chat-bubble chat-bubble-warning">processing ...</div>
        </div>
      {:else if t.includes("\n") && t.match(regex)}
        <!-- Handle line break/lists -->
        <div class="chat chat-end">
          <div class="chat-bubble chat-bubble-warning">
            <ul class="menu rounded-box">
              {#each t.split("\n") as v, i}
                <li>{v}</li>
              {/each}
            </ul>
          </div>
        </div>
      {:else}
        <!-- Show standard text if not empty or list -->
        <div class="chat chat-end">
          <div class="chat-bubble chat-bubble-warning">
            {t}
          </div>
        </div>
      {/if}
    {:else}
      <!-- Must be code, in this case embed. -->
      <div class="chat chat-end">
        <div class=" mockup-code float-right flex-col">
          <pre>{t}</pre>
        </div>
      </div>
    {/if}
  {/each}
{/if}
