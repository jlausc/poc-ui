const URL = "https://02e4-151-205-163-6.ngrok-free.app/api/generate";
export async function callLLM(model: string, prompt: string) {
  const parsedPrompt = prompt.trimEnd();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");

  const raw = `{\r\n  \"model\": \"${model}\",\r\n  \"prompt\": \"${parsedPrompt}\"\r\n}`;

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(URL, requestOptions);
}
