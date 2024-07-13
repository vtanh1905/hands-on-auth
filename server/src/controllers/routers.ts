import { Router } from "express"

import accountController from "./accounts/accounts"

export class Routers {
    static initialize(): Router {
        const router: Router = Router()
        // Account
        router.use('/account', accountController)
        // Return the output
        return router;
    }
}