import { IDatabase } from './IDatabase'
import { Client } from '../entities/Client'
import { Maid } from '../entities/Maid'
import mysql from 'mysql'

export class MySqlDatabase<T> implements IDatabase<T> {
  private options = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_match_maid'
  }

  async saveClient (object: T): Promise<void> {
    const db = mysql.createConnection(this.options)
    db.query('INSERT INTO client SET ? ', object, (error, results) => {
      if (error) throw error
    })
    db.end()
  }

  async saveMaid (object: T, object2: T): Promise<void> {
    this.saveClient(object2)

    const db = mysql.createConnection(this.options)
    db.query('INSERT INTO maid SET ? ', object, (error, results) => {
      if (error) throw error
    })
    db.end()
  }

  async findClientByEmail (email: string): Promise<Client> {
    const db = mysql.createConnection(this.options)
    const getClient = new Promise((resolve, reject) => {
      db.query('SELECT * FROM client WHERE email = ?', [email], (error, results) => {
        if (error) throw error
        if (results.length > 0) {
          return resolve(results[0])
        }
        return resolve(null)
      })
    })
    db.end()

    return getClient.then(function (results) {
      if (results) {
        return new Client(results)
      }
    }).catch((err) => {
      console.log('Error on database insert client querie: ' + err)
      return null
    })
  }

  async findMaidByEmail (email: string): Promise<Maid> {
    const db = mysql.createConnection(this.options)
    const getMaid = new Promise((resolve, reject) => {
      db.query('SELECT * FROM maid WHERE email = ?', [email], (error, results) => {
        if (error) throw error
        if (results.length > 0) {
          return resolve(results[0])
        }
        return resolve(null)
      })
    })
    db.end()

    return getMaid.then(function (results) {
      if (results) {
        return new Maid(results)
      }
    }).catch((err) => {
      console.log('Error on database insert client querie: ' + err)
      return null
    })
  }
}
