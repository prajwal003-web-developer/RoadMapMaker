import { GoogleGenAI } from "@google/genai";
import { ENV } from "./ENV.js";





const ai = new GoogleGenAI({
    apiKey:ENV.AI_API_KEY
});



//     const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Explain how AI works in a few words",
//   });


export const getData = async (data,userId)=>{
    try {

        const prompt = getPrompt(data)
        const response = await ai.models.generateContent({
            model:'gemini-2.5-flash',
            contents:prompt,
        })



        const aiText = response.text
        
        return parseAIJson(aiText)
        
    } catch (error) {

        console.log(error)
        throw new Error(error)
    }
}


const getPrompt = (query)=>{
    const prompt = `You are an expert career and learning roadmap generator.

Task: Generate a weekly roadmap for a user based on their goal. The user will provide a query describing what they want to become or learn. 

Output format: ONLY return JSON. The structure should be an Object with name for suitable Roadmap Name and data as  array where each element is a week/month object. Each week/month object should have:
- Key: "week-{number}" (e.g., "week-1")
- Value: An array of topic objects
- Each topic object should have:
    - Key: "topic"
    - Value: An array of subtopic objects
    - name: Suitable Name accordibg to subtopics
    - explaination: 50 to 60 word explanation of main topics to make i easier
- Each subtopic object should have:
    - Key: "subtopics"
    - Value: An array of objects with a "name" key (the subtopic name)

Rules:
1. No extra text, only JSON.
2. Include 4–8 weeks/months if is for larger period like year, each with 1–3 topics, each topic with 2–5 subtopics if user gave any query then you can overide This rule.
3. Ensure the roadmap is practical and sequential, starting from beginner concepts to advanced.
4. Avoid repeating subtopics.
5. Use clear, concise names for topics and subtopics.
6. give me in JSON version that can be parsed by JSON.parse.

Example input from user:
"I want to become a web developer"

Example output:
{
name:"Roadmap-Name",
data:[
  {
    "week-1": [
      {
        name:'Suitable Topic Name',
        explaination:"Explain the topic and short topics on short",
        "topic": [
          {
            "subtopics": [
              {"name": "HTML Basics"},
              {"name": "CSS Fundamentals"}
            ]
          }
        ]
      }
    ]
  },
  {
    "week-2": [
      {
        name:'Suitable Topic Name',
        explaination:"Explain the topic and short topics on short",
        "topic": [
          {
            "subtopics": [
              {"name": "JavaScript Basics"},
              {"name": "DOM Manipulation"}
            ]
          }
        ]
      }
    ]
  }
]}

Now generate the roadmap for the user query: "${query}"
`

return prompt
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
