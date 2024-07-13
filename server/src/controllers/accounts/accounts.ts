import { Router, Request, Response, NextFunction } from 'express'

import { accountValidator } from './validators/account'
import { AccountService } from '../../services'
import { authenticationMiddleware } from '../../middlewares'
import { CustomRequest } from '../../models'
import { catchAsyncErrors } from '../../utils'

const accountController: Router = Router()

export const accountGetInfo = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = (req as CustomRequest).user

  res.json({
    message: 'Success',
    data: await AccountService.getInstance().getUserByEmail(email)
  })
}

export const accountRegistry = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  await AccountService.getInstance().registry(email, password)

  res.json({
    message: 'Success'
  })
}

export const accountLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  res.json({
    message: 'Success',
    data: {
      token: await AccountService.getInstance().login(email, password)
    }
  })
}

accountController.post('/info', authenticationMiddleware, catchAsyncErrors(accountGetInfo))
accountController.post('/registry', accountValidator, catchAsyncErrors(accountRegistry))
accountController.post('/login', accountValidator, catchAsyncErrors(accountLogin))

export default accountController
