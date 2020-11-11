import request from 'supertest'
import { app } from '../../app'
import mysql from 'mysql'

describe('testing server routes', () => {
  const options = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_match_maid'
  }

  beforeAll(() => {
    const db = mysql.createConnection(options)
    db.query('SET autocommit = OFF;')
    db.query('START TRANSACTION;')
    db.end()
  })

  afterAll(() => {
    const db = mysql.createConnection(options)
    db.query('ROLLBACK;')
    db.end()
  })

  test('it should save new client - POST/client - success', async () => {
    const data = {
      cpf: '073.217.075.39',
      name: 'Aleksander',
      email: 'aleksander-ssousa@outlook.com',
      password: '123',
      phoneNumber: '02177981645264',
      birthDate: '1999-06-26 18:25:43'
    }

    const { body } = await request(app).post('/client').send(data)

    expect(body).toEqual({
      error: false,
      message: 'Client added successfuly!'
    })
  })
})
