import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

import { DBConnection } from '../utils'
import { HttpStatusException } from '../common/exceptions'
import { ErrorMessage, HttpStatusCode } from '../common/constants'

export class UsersService {
  static #instance: UsersService

  public static getInstance() {
    if (!UsersService.#instance) {
      UsersService.#instance = new UsersService()
    }
    return UsersService.#instance
  }

  public async getUserByEmail(email: string) {
    // Get Users
    const result = await DBConnection.getInstance().query('SELECT email FROM app.users WHERE email=$1 LIMIT 1', [
      email
    ])

    // Validate Users does not exist
    if (result.rowCount === 0) {
      throw new HttpStatusException(HttpStatusCode.BAD_REQUEST, { message: ErrorMessage.EMAIL_NOT_EXIST })
    }

    return result.rows[0]
  }

  public async registry(email: string, password: string) {
    // Hash Password
    const passwordHashed = bcrypt.hashSync(password)

    // Insert
    const result = await DBConnection.getInstance().query(
      'INSERT INTO app.users (email, password) SELECT CAST($1 AS VARCHAR), CAST($2 AS VARCHAR) WHERE NOT EXISTS (SELECT email FROM app.users WHERE email = $1)',
      [email, passwordHashed]
    )

    // Validator Email must not exist
    if (result.rowCount === 0) {
      throw new HttpStatusException(HttpStatusCode.BAD_REQUEST, { message: ErrorMessage.EMAIL_EXISTED })
    }
  }

  public async login(email: string, password: string) {
    const result = await DBConnection.getInstance().query('SELECT * FROM app.users WHERE email = $1 LIMIT 1', [
      email
    ])

    if (result.rows.length === 0 || !bcrypt.compareSync(password, result.rows[0].password)) {
      throw new HttpStatusException(HttpStatusCode.BAD_REQUEST, { message: ErrorMessage.EMAIL_OR_PASS_IS_NOT_CORRECT })
    }

    return jwt.sign(
      {
        email: result.rows[0].email
      },
      process.env.JWT_KEY || ''
    )
  }
}
