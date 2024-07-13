import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

import { DBConnection } from '../utils'
import { HttpStatusException } from '../common/exceptions'

export class AccountService {
  static #instance: AccountService

  public static getInstance() {
    if (!AccountService.#instance) {
      AccountService.#instance = new AccountService()
    }
    return AccountService.#instance
  }

  public async getUserByEmail(email: string) {
    // Get Account
    const result = await DBConnection.getInstance().query('SELECT email FROM app.account WHERE email=$1 LIMIT 1', [
      email
    ])

    // Validate Account does not exist
    if (result.rowCount === 0) {
      throw new HttpStatusException(400, { message: 'Email does not exist' })
    }

    return result.rows[0]
  }

  public async registry(email: string, password: string) {
    // Hash Password
    const passwordHashed = bcrypt.hashSync(password)

    // Insert
    const result = await DBConnection.getInstance().query(
      'INSERT INTO app.account (email, password) SELECT CAST($1 AS VARCHAR), CAST($2 AS VARCHAR) WHERE NOT EXISTS (SELECT email FROM app.account WHERE email = $1)',
      [email, passwordHashed]
    )

    // Validator Email exists
    if (result.rowCount === 0) {
      throw new HttpStatusException(400, { message: 'Email exists' })
    }
  }

  public async login(email: string, password: string) {
    const result = await DBConnection.getInstance().query('SELECT * FROM app.account WHERE email = $1 LIMIT 1', [
      email
    ])

    if (result.rows.length === 0 || !bcrypt.compareSync(password, result.rows[0].password)) {
      throw new HttpStatusException(400, { message: 'Email does not exist or Password is not correct' })
    }

    return jwt.sign(
      {
        email: result.rows[0].email
      },
      process.env.JWT_KEY || ''
    )
  }
}
