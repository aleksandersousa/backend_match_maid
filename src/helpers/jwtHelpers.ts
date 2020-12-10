import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../endpoints'
import { client } from './initRedis'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'

const signAcessToken = (email: any) => {
  return new Promise((resolve, reject) => {
    const payload = {}
    const secret = ACCESS_TOKEN_SECRET
    const options = {
      expiresIn: '30m',
      audience: email
    }

    jwt.sign(payload, secret, options, (err: any, token: any) => {
      if (err) {
        return reject(new createError.InternalServerError())
      }
      return resolve(token)
    })
  })
}

const verifyAccessToken = (request: any, response: any, next: any) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(403).send(new createError.Unauthorized())
  }

  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    return response.status(403).send(new createError.InternalServerError())
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, payload: any) => {
    if (err) {
      const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
      return response.status(403).send(new createError.Unauthorized(message))
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
      expiresIn: '7d',
      audience: email
    }

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        return reject(new createError.InternalServerError())
      }

      client.set(email, token, 'EX', 7 * 24 * 60 * 60, (err, reply) => {
        if (err) {
          return reject(new createError.InternalServerError())
        }
        return resolve(token)
      })
    })
  })
}

const verifyRefreshToken = (refreshToken: any) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: any, payload: any) => {
      if (err) {
        return reject(new createError.Unauthorized())
      }

      const userEmail = payload.aud

      client.get(userEmail, (err, result) => {
        if (err) {
          return reject(new createError.InternalServerError())
        }

        if (refreshToken === result) {
          return resolve(userEmail)
        }

        return reject(new createError.InternalServerError())
      })
    })
  })
}

export { signAcessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken }
