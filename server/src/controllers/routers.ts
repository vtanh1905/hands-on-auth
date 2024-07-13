import { Router } from "express"

import usersController from "./users/users"

export class Routers {
  static initialize(): Router {
    const router: Router = Router()
    // Users
    router.use('/users', usersController)
    // Return the output
    return router;
  }
}