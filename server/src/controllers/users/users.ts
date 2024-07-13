import { Router, Request, Response, NextFunction } from 'express'

import { usersValidator } from './validators'
import { UsersService } from '../../services'
import { authenticationMiddleware } from '../../middlewares'
import { CustomRequest } from '../../models'
import { catchAsyncErrors } from '../../utils'

const usersController: Router = Router()

export const usersGetInfo = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = (req as CustomRequest).user

  res.json({
    message: 'Success',
    data: await UsersService.getInstance().getUserByEmail(email)
  })
}

export const usersRegistry = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  await UsersService.getInstance().registry(email, password)

  res.json({
    message: 'Success'
  })
}

export const usersLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  res.json({
    message: 'Success',
    data: {
      token: await UsersService.getInstance().login(email, password)
    }
  })
}

usersController.post('/info', authenticationMiddleware, catchAsyncErrors(usersGetInfo))
usersController.post('/registry', usersValidator, catchAsyncErrors(usersRegistry))
usersController.post('/login', usersValidator, catchAsyncErrors(usersLogin))

export default usersController
