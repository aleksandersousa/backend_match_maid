import request from 'supertest'
import { app } from '../../app'

describe('testing server routes', () => {
  it('should get maid - GET/get/maid - success', async () => {
    const { body } = await request(app).get('/get/maid/1')

    expect(body).toEqual({
      error: false,
      results: {}
    })
  })
})
