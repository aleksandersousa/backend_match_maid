import request from 'supertest'
import { app } from '../../app'

describe('testing server routes', () => {
  it('should delete maid - DELETE/delete/maid - success', async () => {
    const data = { cpf: '000.000.000-01' }

    const { body } = await request(app).delete('/delete/maid').query(data)

    expect(body).toEqual({})
  })
})
