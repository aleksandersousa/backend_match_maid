import request from 'supertest'
import { app } from '../../app'

describe('testing server routes', () => {
  it('should get client - GET/get/client - success', async () => {
    const { body } = await request(app).get('/get/client/1')

    expect(body).toEqual({
      error: false,
      results: {}
    })
  })
})
