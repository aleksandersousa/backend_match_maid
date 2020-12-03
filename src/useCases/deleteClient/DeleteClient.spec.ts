import request from 'supertest'
import { app } from '../../app'

describe('testing server routes', () => {
  it('should delete client - DELETE/delete/client - success', async () => {
    const { body } = await request(app).delete('/delete/client/1')
    expect(body).toEqual({})
  })
})
