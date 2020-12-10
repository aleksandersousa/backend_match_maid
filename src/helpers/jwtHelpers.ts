import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../endpoints.config'
import { client } from './initRedis'
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

const signRefreshToken = (email: any) => {
  return new Promise((resolve, reject) => {
    const payload = {}
    const secret = REFRESH_TOKEN_SECRET
    const options = {
      expiresIn: '1y',
      audience: email
    }

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        return reject(err)
      }

      client.set(email, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
        if (err) {
          return reject(new Error(err.message))
        }
        return resolve(token)
      })
    })
  })
}

const verifyRefreshToken = (refreshToken: any) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) {
        return reject(err)
      }

      const userEmail = payload.aud

      client.get(userEmail, (err, result) => {
        if (err) {
          return reject(new Error(err.message))
        }

        if (refreshToken === result) {
          return resolve(userEmail)
        }

        return reject(new Error('Unauthorized.'))
      })

      return resolve(refreshToken)
    })
  })
}

export { signAcessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken }
