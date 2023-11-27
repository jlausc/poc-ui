<script lang="ts">
  import FileList from "../embeddings/FileList.svelte";
  import UploadPdf from "../embeddings/UploadPdf.svelte";
</script>

<!-- Open the modal using ID.showModal() method -->
<button class="btn" onclick="my_modal_1.showModal()">Embed documents</button>
<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <div class="p-3">
      <FileList />
      <UploadPdf />
    </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >✕</button
        >
      </form>
    </div>
  </div>
</dialog>

<style>
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
  }
</style>
