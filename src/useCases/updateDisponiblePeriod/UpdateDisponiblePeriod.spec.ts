import request from 'supertest'
import { app } from '../../app'

describe('testing server routes', () => {
  it('should update disponible period - PUT/update/maid/disponiblePeriod - success', async () => {
    const data = {
      maidCpf: '000.000.000-01',
      morning: true,
      afternoon: true,
      night: true
    }

    const { body } = await request(app).delete('/update/maid/disponiblePeriod/000.000.000-01').send(data)

    expect(body).toEqual({})
  })
})
