import request from 'supertest'
import { app } from '../../app'

describe('testing server routes', () => {
  it('should update disponible days - PUT/update/maid/disponibleDays - success', async () => {
    const data = {
      maidCpf: '000.000.000-01',
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: false,
      friday: false,
      saturday: true,
      sunday: true
    }

    const { body } = await request(app).delete('/update/maid/disponibleDays/1').send(data)

    expect(body).toEqual({})
  })
})
