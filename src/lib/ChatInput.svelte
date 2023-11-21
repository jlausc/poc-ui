<script lang="ts">
  import { callLLM } from "../api/llm";
  import { messages } from "../stores/messages";
  import { processing } from "../stores/processing";
  import { modelName } from "../stores/model";
  let input = "";

  const handleSubmit = (msg: string) => {
    if (!msg) {
      return;
    }
    if ($processing) {
      alert("Please wait for the current request to finish.");
      return;
    }

    $messages = [...$messages, msg];
    input = "";
    $processing = true;

    const msgIndex = $messages.length;
    $messages[msgIndex] = "";

    console.log("$", $modelName);

    // Call endpoint here
    callLLM($modelName, msg)
      // Retrieve its body as ReadableStream
      .then((response) => {
        if (!response.body) return;
        const reader = response.body.getReader();
        return new ReadableStream({
          start(controller) {
            const pump = () => {
              return reader.read().then(({ done, value }) => {
                // When no more data needs to be consumed, close the stream
                const decoder = new TextDecoder();
                const str = decoder.decode(value);
                const res = JSON.parse(str).response;

                $messages[msgIndex] += res;

                if (done) {
                  controller.close();
                  return;
                }
                // Enqueue the next data chunk into our target stream
                controller.enqueue(value);
                return pump();
              });
            };
            return pump();
          },
        });
      })
      // Create a new response out of the stream
      .then((stream) => {
        new Response(stream);
        console.log("stream", stream);
      })
      .then((r) => {
        console.log("done processing", r);
        $processing = false;
      })
      .catch((err) => console.error(err));
  };

  const onKeyDown = (
    e: KeyboardEvent & { currentTarget: EventTarget & Window }
  ) => {
    if (e.code == "Enter") {
      console.log("Enter pressed");
      handleSubmit(input);
    }
  };
</script>

<svelte:window on:keydown={onKeyDown} />

<textarea class="w-5/6 h-full" bind:value={input} />

<button
  class="w-1/6 h-full border border-blue-500 rounded-lg"
  on:click={() => handleSubmit(input)}>Submit</button
>

<style>
</style>
