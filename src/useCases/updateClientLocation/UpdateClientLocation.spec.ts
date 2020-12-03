import request from 'supertest'
import { app } from '../../app'

describe('testing server routes', () => {
  it('should update client location - PUT/update/client/clientLocation - success', async () => {
    const data = {
      latitude: -14.525221,
      longitude: -40.363233,
      street: 'Test Street UP',
      houseNumber: '00',
      neighborhood: 'Test',
      city: 'Test City',
      cep: '00000-000',
      uf: 'TS'
    }

    const { body } = await request(app).delete('/update/clientLocation/1').send(data)

    expect(body).toEqual({})
  })
})
