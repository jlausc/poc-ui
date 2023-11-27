<script lang="ts">
  import { code, modelName } from "../stores/model";

  import { modelMap, codellama, openHermes, mistral } from "../utils/maps";
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl">Current Model: {modelMap[$modelName]}</a>
  </div>

  <label for="code-input">Adjust code here:</label>

  <input
    type="text"
    id="code-input"
    placeholder="Enter code here"
    class="input input-sm input-bordered input-primary max-w-xs mx-4"
    bind:value={$code}
  />

  <div class="flex-none">
    <ul class="menu menu-horizontal px-1 z-10">
      <!-- <li><a>Link</a></li> -->
      <li class="right-8">
        <details>
          <summary> Model </summary>
          <ul class="p-2 my-2 bg-base-100">
            <li>
              <a
                on:click={() => {
                  $modelName = "mistral";
                }}>{mistral}</a
              >
            </li>
            <li>
              <a
                on:click={() => {
                  $modelName = "codellama";
                }}>{codellama}</a
              >
            </li>
            <li>
              <a
                on:click={() => {
                  {
                    $modelName = "openhermes2-mistral";
                  }
                }}>{openHermes}</a
              >
            </li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>

<style>
  .dnone {
    display: none;
  }
</style>
