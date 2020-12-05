import request from 'supertest'
import { app } from '../../app'

describe('testing server routes', () => {
  it('should get all clients - GET/get/clients - success', async () => {
    const { body } = await request(app).get('/get/clients')
    expect(body).toEqual({
      error: false,
      message: 'Client added successfuly!'
    })
  })
})
