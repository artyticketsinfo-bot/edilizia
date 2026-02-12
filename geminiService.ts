
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async getRenovationAdvice(userPrompt: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: userPrompt,
        config: {
          systemInstruction: "Sei un esperto Ingegnere Civile e Capocantiere di EdilModern, impresa specializzata in nuove costruzioni, fondamenta e strutture in cemento armato. Rispondi con tono tecnico, autorevole e rassicurante. Focalizzati su sicurezza sismica, durabilità dei materiali e normativa edilizia. Invita sempre a richiedere un sopralluogo tecnico per valutare il terreno o il progetto.",
          temperature: 0.7,
        },
      });
      return response.text || "Spiacente, non ho potuto elaborare una consulenza tecnica al momento. Ti invitiamo a contattare i nostri uffici tecnici.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "C'è stato un errore nel contattare l'assistente tecnico. Per favore, prova più tardi.";
    }
  }
}
