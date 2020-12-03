import request from 'supertest'
import { app } from '../../app'

describe('testing server routes', () => {
  it('should delete maid - DELETE/delete/maid - success', async () => {
    const { body } = await request(app).delete('/delete/maid/1')

    expect(body).toEqual({})
  })
})
