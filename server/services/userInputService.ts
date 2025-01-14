import UserInputModel from '@/models/UserInputModel';
import type { UserInput } from '@/types';
import type { Types } from 'mongoose';
import { InternalServerError, NotFoundError } from '@/utils/customErrors';
import log4js from 'log4js';

const logger = log4js.getLogger('[UserInputService]');

/**
 * Creates a service for managing user inputs.
 * @returns {object} User input service with various methods
 */
const createUserInputService = () => {
  /**
   * Creates a new user input.
   */
  const createUserInput = async (
    userId: string,
    input: string,
    title?: string,
  ): Promise<UserInput> => {
    try {
      // Set the title to the input value if not provided
      const finalTitle = title || input;

      logger.debug('Creating new user input', { userId, input, finalTitle });

      // Creates a new user input in DB
      const newUserInput = new UserInputModel({
        userId,
        input,
        title: finalTitle,
      });
      await newUserInput.save();
      return newUserInput;
    } catch (error) {
      logger.error('Error creating user input.', error);

      throw new InternalServerError('Error creating user input.');
    }
  };

  /**
   * Fetches input history for a user.
   */
  const fetchInputHistory = async (
    userId: Types.ObjectId,
    page: number,
    limit: number,
  ): Promise<UserInput[]> => {
    try {
      // Calculate the number of items to skip for pagination
      const skip = (page - 1) * limit;

      logger.debug('Fetching input history', { userId, page, limit, skip });

      // Fetch the input history from DB
      const inputHistory = await UserInputModel.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .select('title input');

      return inputHistory;
    } catch (error) {
      logger.error('Error fetching input history.', error);

      throw new InternalServerError('Error fetching input history.');
    }
  };

  /**
   * Updates the title of a user input.
   */
  const updateInputTitle = async (
    userInputId: Types.ObjectId,
    newTitle: string,
  ): Promise<UserInput> => {
    try {
      logger.debug('Updating user input title', { userInputId, newTitle });

      // Update the title of the specified user input in DB
      const updatedUserInput = await UserInputModel.findByIdAndUpdate(
        userInputId,
        { title: newTitle },
        { new: true },
      );

      if (!updatedUserInput) {
        logger.error(`UserInput with id ${userInputId} not found.`);
        throw new NotFoundError(`UserInput with id ${userInputId} not found.`);
      }

      return updatedUserInput;
    } catch (error) {
      logger.error('Error updating input title.', error);

      throw new InternalServerError('Error updating input title.');
    }
  };

  /**
   * Deletes a user input.
   */
  const deleteUserInput = async (
    userInputId: Types.ObjectId,
  ): Promise<UserInput | null> => {
    try {
      logger.debug('Deleting user input', userInputId);

      // Delete the user input document in DB
      const deletedUserInput =
        await UserInputModel.findByIdAndDelete(userInputId);

      return deletedUserInput;
    } catch (error) {
      logger.error('Error deleting input and associated data.', error);

      throw new InternalServerError(
        'Error deleting input and associated data.',
      );
    }
  };

  return {
    createUserInput,
    fetchInputHistory,
    updateInputTitle,
    deleteUserInput,
  };
};

export default createUserInputService;
