import express from 'express';
import type { Request, Response } from 'express';
import genAiController from '../controllers/genAiController';

const router = express.Router();

// default route for testing. This route should be removed in production.
router.get('/', (_: Request, res: Response) => {
  res.send({ message: 'Hello from the AI!' });
});

/**
 * Ask the AI to generate a tree.
 */
router.post(
  '/query',
  genAiController.generateTree,
  (_: Request, res: Response) => {
    res.send({ message: 'tree', response: res.locals.tree });
  }
);

export default router;
