import { json } from "@remix-run/node";
import axios from "axios";
import { getDocument } from "~/lib/vector-search";
import { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  try {
    const { prompt } = await request.json();

    // const docs = await getDocument(prompt) as { text: string }[];
    // console.log(docs);

    // if (!docs || docs.length === 0) {
    //   return json({ message: "No matching documents found." });
    // }

    // const context = docs.map((d: { text: string }) => d.text).join("\n");

    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "deepseek-r1",
      prompt: prompt,
      stream: false
    });

    const data = response.data.response;
    console.log("hello", data);

    return json({ message: [data] });
  } catch (error) {
    console.error("Error:", error);
    return json({ error: "An error occurred." }, { status: 500 });
  }
};