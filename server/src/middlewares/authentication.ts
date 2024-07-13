import { Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { HttpStatusException } from '../common/exceptions'
import { CustomRequest } from '../models'
import { ErrorMessage, HttpStatusCode } from '../common/constants'

export const authenticationMiddleware: any = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_KEY || '', (err: any, user: any) => {
    if (err) {
      throw new HttpStatusException(HttpStatusCode.FORBIDDEN, ErrorMessage.FORBIDDEN)
    }

    req.user = user

    next()
  })
}
