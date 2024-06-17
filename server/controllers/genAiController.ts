import type { Request, Response, NextFunction } from 'express';
import { startGeneration } from '@models/GeminiModel';
import { type Content } from '@google/generative-ai';
import { createError } from '@middleware/errorHandling';

//in initial response generation, there is no chat history, so using []
export const generateInitialResponse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userInput = req.body.input;
  const history: Content[] = [];
  try {
    if (userInput) {
      const response = await startGeneration(history, userInput);

      // TODO: implement logging service
      // console.log('LLM response:', response);
      /*------> placeholder for store LLM response to DB  <------*/

      res.locals.linktaFlow = response;

      return next();
    }
  } catch (err: unknown) {
    const methodError = createError(
      'generateInitialResponse',
      'genAIController',
      'Error generating response from AI.',
      err
    );
    return next(methodError);
  }
};

/*
** this is a stretch feature  & Work in progress **
   for LLM response generation after initial response/generation under the same input
*/
export const generateResponseWithHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userInput: string = req.body.input; //call getUserInput(or get initial userInput from DB)
    const latestLinktaFlow: string = req.body.linktaFlow; //call getUserInput -> linktaFlows -> linktaFlows[linktaFlow.length-1]
    const customizedHistory: Content[] = [
      {
        role: 'user',
        parts: [{ text: userInput }],
      },
      {
        role: 'model',
        parts: [{ text: latestLinktaFlow }],
      },
    ];

    const response = await startGeneration(customizedHistory, userInput);
    res.locals.linktaFlow = response;
  } catch (err) {
    const methodError = createError(
      'generateResponseWithContext',
      'genAIservice',
      'Error generating response from AI',
      err
    );
    return next(methodError);
  }
};
