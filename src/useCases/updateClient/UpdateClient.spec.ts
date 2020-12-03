import request from 'supertest'
import { app } from '../../app'

describe('testing server routes', () => {
  it('should update client - PUT/update/client - success', async () => {
    const data = {
      name: 'Test User updated',
      email: 'email@test.com',
      password: '12345678',
      phoneNumber: '00000000000000',
      birthDate: '1999-06-26 18:25:43'
    }

    const { body } = await request(app).delete('/update/client/1').send(data)

    expect(body).toEqual({})
  })
})
