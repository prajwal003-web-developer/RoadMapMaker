import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({
    apiKey:'IzaSyDEBoidnF3BlDVydR2MO0um2iLl3ufLt0E'
});

async function  textToSpeech() {
 
     const response = await ai.models.generateContent({
            model:'gemini-2.5-flash-native-audio-dialog',
            contents:"Explain How Are You",
        })

  

  // Audio comes as base64
  const audioPart = response.response.candidates[0].content.parts
    .find(p => p.inlineData);

  const audioBase64 = audioPart.inlineData.data;
  const audioBuffer = Buffer.from(audioBase64, "base64");

  fs.writeFileSync("output.wav", audioBuffer);
}

textToSpeech();
