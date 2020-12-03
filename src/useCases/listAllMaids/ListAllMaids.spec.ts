import request from 'supertest'
import { app } from '../../app'

describe('testing server routes', () => {
  it('should get all maids - GET/get/maids - success', async () => {
    const { body } = await request(app).get('/get/maids')
    expect(body).toEqual({
      error: false,
      message: 'Client added successfuly!'
    })
  })
})
