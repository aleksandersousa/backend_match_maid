import { ACCESS_TOKEN_SECRET } from '../endpoints'
import jwt from 'jsonwebtoken'

const signAcessToken = (email: any) => {
  return new Promise((resolve, reject) => {
    const payload = {}
    const secret = ACCESS_TOKEN_SECRET
    const options = {
      expiresIn: '1h',
      audience: email
    }

    jwt.sign(payload, secret, options, (err: any, token: any) => {
      if (err) {
        return reject(err)
      }
      return resolve(token)
    })
  })
}

const verifyAccessToken = (request: any, response: any, next: any) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return next(new Error('Missing Authorization header'))
  }

  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    return response.sendStatus(401)
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, payload: any) => {
    if (err) {
      const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
      return next(new Error(message))
    }

    request.payload = payload
    next()
  })
}

export { signAcessToken, verifyAccessToken }
