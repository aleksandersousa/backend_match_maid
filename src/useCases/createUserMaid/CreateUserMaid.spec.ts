import request from 'supertest'
import { app } from '../../app'

describe('testing server routes', () => {
  it('should save new maid - POST/create/maid - success', async () => {
    const data = {
      cpf: '000.000.000-01',
      name: 'Test User',
      email: 'email@email.com',
      password: '123',
      phoneNumber: '00000000000000',
      birthDate: '1999-06-26 18:25:43',
      status: false,
      location: {
        maidCpf: '000.000.000-01',
        latitude: -14.525221,
        longitude: -40.363233,
        street: 'Street Test',
        houseNumber: '00',
        neighborhood: 'Test',
        city: 'TestCity',
        cep: '00000-000',
        uf: 'TS'
      }
    }

    const { body } = await request(app).post('/create/maid').send(data)

    expect(body).toEqual({
      error: false,
      message: 'Maid added successfuly!'
    })
  })
})
