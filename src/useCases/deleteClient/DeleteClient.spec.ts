import request from 'supertest'
import { app } from '../../app'

describe('testing server routes', () => {
  it('should delete client - DELETE/delete/client - success', async () => {
    const data = { cpf: '000.000.000-00' }

    const { body } = await request(app).delete('/delete/client').query(data)

    expect(body).toEqual({})
  })
})
