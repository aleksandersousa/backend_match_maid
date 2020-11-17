import request from 'supertest'
import { app } from '../../app'

describe('testing server routes', () => {
  it('should save new maid - POST/create/maid - success', async () => {
    const data = {
      cpf: '000.000.000-01',
      name: 'Aleksander',
      email: 'aleksander-ssousa@outlook.com',
      password: '123',
      phoneNumber: '02177981645264',
      birthDate: '1999-06-26 18:25:43',
      status: false,
      location: {
        maidCpf: '000.000.000-01',
        latitude: -14.525221,
        longitude: -40.363233,
        street: 'Rua Santa Cruz',
        houseNumber: '84',
        neighborhood: 'Centro',
        city: 'Poções',
        cep: '45260-000',
        uf: 'BA'
      }
    }

    const { body } = await request(app).post('/create/maid').send(data)

    expect(body).toEqual({
      error: false,
      message: 'Maid added successfuly!'
    })
  })
})
