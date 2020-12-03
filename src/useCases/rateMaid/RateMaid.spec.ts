import request from 'supertest'
import { app } from '../../app'

describe('testing server routes', () => {
  it('should create or update maid rating - POST/update/maid/rating - success', async () => {
    const data = {
      maidCpf: '000.000.000-01',
      stars: 8.8,
      goodWork: true,
      onTime: true,
      arrivedOnTime: false
    }

    const { body } = await request(app).post('/update/maid/rating/1').send(data)

    expect(body).toEqual({
      error: false,
      message: 'Rated maid successfuly!'
    })
  })
})
