import { Client } from 'src/entities/Client'
import { IClientRepository } from '../IClientRepository'
import { db } from '../../db'

export class MySqlClientsRepository implements IClientRepository {
  async findByEmail (email: string): Promise<Client> {
    const getClient = new Promise((resolve, reject) => {
      db.query('SELECT * FROM client WHERE email = ?', [email], (error, results) => {
        if (error) throw error
        if (results.length > 0) {
          resolve(results[0])
        }
        return resolve(null)
      })
    })

    return getClient.then(function (results) {
      if (results) {
        return new Client(results)
      }
      return null
    }).catch((err) => {
      console.log('Error on database insert client querie: ' + err)
      return null
    })
  }

  async save (client: Client): Promise<void> {
    db.query('INSERT INTO client SET ? ', client, (error, results) => {
      if (error) throw error
    })
  }
}
