import request from 'supertest'
import { app } from '../../app'

describe('testing server routes', () => {
  it('should update maid - PUT/update/maid - success', async () => {
    const data = {
      cpf: '000.000.000-01',
      name: 'Test User Up',
      email: 'email@email.com',
      password: '12345678',
      phoneNumber: '00000000000000',
      birthDate: '1999-06-26 18:25:43',
      status: false
    }

    const { body } = await request(app).delete('/update/maid/000.000.000-01').send(data)

    expect(body).toEqual({})
  })
})
