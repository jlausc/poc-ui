import { get } from "svelte/store";
import { code } from "../stores/model";
export async function callLLM(model: string, prompt: string) {
  const URL = `https://${get(code)}-151-205-163-6.ngrok-free.app/api/generate`;
  let parsedPrompt = prompt.trim().replaceAll(`"`, `'`);
  parsedPrompt = parsedPrompt.replaceAll("\\", "\\\\");
  console.log("pp", parsedPrompt);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");

  const raw = `{\r\n  \"model\": \"${model}\",\r\n  \"prompt\": \"${parsedPrompt}\"\r\n}`;

  console.log("model", raw);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(URL, requestOptions);
}
