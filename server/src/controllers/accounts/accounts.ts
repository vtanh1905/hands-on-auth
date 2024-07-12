import { Router, Request, Response, NextFunction } from 'express'

import { accountValidator } from './validators/account'
import { AccountService } from '../../services'
import { authenticationMiddleware } from '../../middlewares'
import { HttpStatusException } from '../../common/exceptions'
import { CustomRequest } from '../../models'

const accountController: Router = Router()

export const accountGetInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = (req as CustomRequest).user

    res.json({
      message: 'Success',
      data: await AccountService.getInstance().getUserByEmail(email)
    })
  } catch (error) {
    next(error)
  }
}

export const accountRegistry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    await AccountService.getInstance().registry(email, password)

    res.json({
      message: 'Success'
    })
  } catch (error) {
    next(error)
  }
}

export const accountLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    res.json({
      message: 'Success',
      data: {
        token: await AccountService.getInstance().login(email, password)
      }
    })
  } catch (error) {
    next(error)
  }
}

accountController.post('/info', authenticationMiddleware, accountGetInfo)
accountController.post('/registry', accountValidator, accountRegistry)
accountController.post('/login', accountValidator, accountLogin)

export default accountController
