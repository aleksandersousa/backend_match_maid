import request from 'supertest'
import { app } from '../../app'

describe('testing server routes', () => {
  it('should save new client - POST/create/maid/rating - success', async () => {
    const data = {
      maidCpf: '000.000.000-01',
      stars: 8.7,
      goodWork: true,
      onTime: true,
      arrivedOnTime: false
    }

    const { body } = await request(app).post('/create/maid/rating').send(data)

    expect(body).toEqual({
      error: false,
      message: 'Rated maid successfuly!'
    })
  })
})
