import request from 'supertest'
import { app } from '../../app'

describe('testing server routes', () => {
  it('should update maid location - PUT/update/maid/maidLocation - success', async () => {
    const data = {
      maidCpf: '000.000.000-01',
      latitude: -14.525221,
      longitude: -40.363233,
      street: 'Street Test Up',
      houseNumber: '00',
      neighborhood: 'Test',
      city: 'TestCity',
      cep: '00000-000',
      uf: 'TS'
    }

    const { body } = await request(app).delete('/update/maid/maidLocation/000.000.000-01').send(data)

    expect(body).toEqual({})
  })
})
