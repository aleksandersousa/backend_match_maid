import request from 'supertest'
import { app } from '../../app'

describe('testing server routes', () => {
  it('should update maid services - PUT/update/maid/services - success', async () => {
    const data = {
      maidCpf: '000.000.000-01',
      nanny: true,
      careHouse: false,
      cleanHouse: true,
      ironClothes: true,
      washClothes: false,
      washDishes: false,
      cook: false
    }

    const { body } = await request(app).delete('/update/maid/services/1').send(data)

    expect(body).toEqual({})
  })
})
