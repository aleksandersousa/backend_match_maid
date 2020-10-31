import express from 'express'
import { router } from '../../routes'
import request from 'supertest'

const app = express()
app.use('/states', router)

describe('testing server routes', () => {
  it('POST /client - success', async () => {
    const data = {
      cpf: '073.217.075.39',
      name: 'Aleksander',
      email: 'aleksander-ssousa@outlook.com',
      password: '123',
      phoneNumber: '02177981645264',
      birthDate: '1999-06-26T18:25:43.511Z'
    }

    const { body } = await request(app).post('/client').send(data)

    expect(body).toEqual({})
  })
})
