import { getEnv } from '@utils/environment';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NotFoundError } from '@/utils/customErrors';

import type {
  GenerationConfig,
  Content,
  SafetySetting,
} from '@google/generative-ai';
import { HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

getEnv();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  // throw new Error('Gemini API key not found');
  throw new NotFoundError('Gemini API key not found');
}

const generate_config: GenerationConfig = {
  temperature: 0.5,
  maxOutputTokens: 10000,
  responseMimeType: 'application/json',
};

const safetySettings: SafetySetting[] = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

/**
 * Create a Gemini API connection.
 */
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * The GenerativeModel to use during prompt generation.
 */
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: generate_config,
  safetySettings: safetySettings,
  systemInstruction:
    '#CONTEXT#\n\nI am a visual learner. I need you to process and brainstorm a path to learning a complex subject. The result will be rendered in the browser as a directed graph using the ReactFlow and Dagre libraries.\n#############\n\n# OBJECTIVE#\n\nI want you analyze the user input and create a JSON response object containing a list of Nodes and a list of Edges. Edges have source and target properties to reference specific Nodes and represent hierarchical relationships. Make the hierarchy 3 or 4 levels deep. Level 1 nodes can have a mximum of three children. Level 2 nodes can have a maximum of two children. Level 3 nodes can have a maximumm of three children. The total number of nodes for all tiers combined should be between 7 and 15. If any node has no parent, then place it at the far right in Level 2 and give it a child or two of its own. Use this step-by-step process:\n\n1. Define the topic based on the user input as top-center Level 1 Node.\n2. Create a tree-like data structure of Nodes and Edges to represent the process or brainstorm information, where each node represents a topic. Assign a unique "id" to each node based on its level in the tree, and include "data" property containing a "label" property with the maximum of three keywords that describe the subject as its value. If "data.label" is a list, parse it into a single string of the list items.\n3. Ensure the result is a valid ReactFlow JSON object containing a list of Nodes and a list of Edges.\n#############\n\n# STYLE#\n\nJSON\n#############\n\n# TONE#\n\nProfessional, technical\n#############\n\n# AUDIENCE#\n\nAdult learner; ADHD learner\n#############\n\n# RESPONSE: a JSON object#\n\n\'{"nodes":[{id, data:{label}}],"edges":[{id, source, target}]}\'\n#############\n\n# START ANALYSIS#',
});

/**
 * Generate a response to a prompt in the context of a conversation.
 *
 * @param history The conversation history.
 * @param prompt The prompt to use in generating the response.
 * @return The text of the generated response.
 */
export const startGeneration = async (
  history: Content[],
  prompt: string,
): Promise<string> => {
  if (!model) {
    // throw new Error('Model not found');
    throw new NotFoundError('Model not found');
  }
  const chat = model.startChat({ history });
  const result = await chat.sendMessage(prompt);
  // //count tokens
  // const his = await chat.getHistory();
  // const msgContent = { role: 'user', parts: [{ text: prompt }] };
  // const contents = [...his, msgContent];
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO: remove when logging service is implemented to use totalTokens
  // const { totalTokens } = await model.countTokens({ contents });
  // TODO: implement logging service
  // console.log('totalToken:', totalTokens);

  return result.response.text();
};
