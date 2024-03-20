import Gemini from "../models/GeminiModel";

import type { AiInterface, AiTypes } from "../types/ai";

/**
 * AI Factory interface.
 *
 * @param ai The type of AI to connect to
 * @return an AI connection
 */
export default function createAi(ai: AiTypes): AiInterface {
  switch (ai) {
    case "gemini":
      return new Gemini();
    default:
      throw new Error("Invalid AI type");
  }
}