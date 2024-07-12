import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpStatusException } from '../common/exceptions'


export const checkSchemaErrorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new HttpStatusException(400, errors)
  }
  next()
}
