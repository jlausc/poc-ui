<script>
  import { embeddedFiles, uploadedFiles } from "../../stores/uploads";
</script>

<div class="collapse collapse-arrow bg-base-200 my-2">
  <input type="radio" name="my-accordion-2" checked="checked" />
  <div class="collapse-title text-xl font-medium">Uploaded documents</div>
  <div class="collapse-content">
    {#if $uploadedFiles}
      {#each $uploadedFiles as file}
        <p>{file.name}</p>
      {/each}
    {:else}
      <p>No uploaded files!</p>
    {/if}
  </div>
</div>
<div class="collapse collapse-arrow bg-base-200">
  <input type="radio" name="my-accordion-2" />
  <div class="collapse-title text-xl font-medium">Embedded documents</div>
  <div class="collapse-content">
    {#if $embeddedFiles}
      {#each $embeddedFiles as f}
        <p>placeholder file name</p>
      {/each}
    {:else}
      <p>No embedded files!</p>
    {/if}
  </div>
</div>
