import { CustomError, HttpCode } from './CustomError';

// --- Error Classes ---
export class NotFoundError extends CustomError {
  constructor(message: string){
    super(message, HttpCode.NOT_FOUND)
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string){
    super(message, HttpCode.BAD_REQUEST)
  }
}