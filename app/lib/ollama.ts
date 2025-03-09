import axios from "axios";

export async function chatWithOllama(prompt: string) {
  const response = await axios.post("http://localhost:11434/api/generate", {
    model: "orca-mini:7b",
    prompt,
  });

  return response.data.message;
}
