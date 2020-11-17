import request from 'supertest'
import { app } from '../../app'

describe('testing server routes', () => {
  it('should save new client - POST/create/client - success', async () => {
    const data = {
      cpf: '000.000.000-00',
      name: 'Aleksander',
      email: 'aleksan-ssousa@outlook.com',
      password: '123',
      phoneNumber: '02177981645264',
      birthDate: '1999-06-26 18:25:43',
      location: {
        clientCpf: '000.000.000-00',
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

    const { body } = await request(app).post('/create/client').send(data)

    expect(body).toEqual({
      error: false,
      message: 'Client added successfuly!'
    })
  })
})
