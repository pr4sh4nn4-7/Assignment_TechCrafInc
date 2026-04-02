import { ErrorHandler } from './Error.js';

export const TryCatchHandler = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      if (err instanceof ErrorHandler) {
        return res.status(err.status).json({
          message: err.message,
        });
      }
      return res.status(500).json({
        message: err.message,
      });
    }
  };
};
