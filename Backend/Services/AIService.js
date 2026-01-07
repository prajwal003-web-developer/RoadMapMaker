import { GoogleGenAI } from "@google/genai";
import { ENV } from "./ENV.js";





const ai = new GoogleGenAI({
  apiKey: ENV.AI_API_KEY
});



//     const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Explain how AI works in a few words",
//   });


export const getData = async (data, userId) => {
  try {

    const prompt = getPrompt(data)
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    })

    const aiText = response.text

    console.log("apple")

    return parseAIJson(aiText)

  } catch (error) {
    throw new Error(error)
  }
}


const getPrompt = (query) => {
  const prompt = `You are an expert career and learning roadmap creator.

Generate a practical weekly roadmap based on the user's aim and time.

Input query (stringified JSON): ${JSON.stringify(query)}

Output: ONLY valid JSON parsable by JSON.parse.
Structure:
{
  name: "Roadmap Name",
  data: [
    {
      "week-{number}": [
        {
          name: "Topic Name",
          explaination: "50–60 word description",
          topic: [
            {
              subtopics: [
                { "name": "Subtopic 1" },
                { "name": "Subtopic 2" }
              ]
            }
          ]
        }
      ]
    }
  ]
}

Rules:
- 4–8 weeks unless user goal implies otherwise
- Each week has 1–3 topics; each topic 2–5 subtopics
- Beginner → advanced progression
- No repeated subtopics
- Clear concise names
- Output ONLY JSON — no extra text

User query describes: what they want to become/learn.

Now generate the roadmap.`

  return prompt;
}



function parseAIJson(text) {
  if (typeof text !== "string") {
    throw new Error("Input must be a string");
  }

  // 1. Remove markdown code fences ```json ``` or ```
  let cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  // 2. Extract JSON safely (between first [ or { and last ] or })
  const startIndex = Math.min(
    ...["[", "{"]
      .map(ch => cleaned.indexOf(ch))
      .filter(i => i !== -1)
  );

  const endIndex = Math.max(
    cleaned.lastIndexOf("]"),
    cleaned.lastIndexOf("}")
  );

  if (startIndex === -1 || endIndex === -1) {
    throw new Error("No valid JSON found in text");
  }

  const jsonString = cleaned.slice(startIndex, endIndex + 1);

  // 3. Parse JSON
  try {
    return JSON.parse(jsonString);
  } catch (err) {
    throw new Error("Invalid JSON format");
  }
}
