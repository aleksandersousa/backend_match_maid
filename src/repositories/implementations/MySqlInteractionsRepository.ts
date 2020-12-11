import { Interactions } from '../../entities/Interactions'
import { IInteractionsRepository } from '../IInteractionsRepository'
import mysql from 'mysql'

export class MySqlInteractionRepository implements IInteractionsRepository {
  private options = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_match_maid',
    multipleStatements: true
  }

  async createInteraction (interactions: Interactions): Promise<void> {
    const db = mysql.createConnection(this.options)
    db.query('INSERT INTO interactions SET ?', interactions, (err, results) => {
      if (err) {
        throw new Error(err.message)
      }
    })
    db.end()
  }

  async getInteractionsById (maidId: number): Promise<[Interactions]> {
    const db = mysql.createConnection(this.options)
    const getInteractions = new Promise((resolve, reject) => {
      db.query('SELECT * FROM interactions WHERE maidId = ?', maidId, (error: any, results: any) => {
        if (error) {
          return reject(error)
        }
        if (results.length > 0) {
          return resolve(results)
        }
        return resolve([])
      })
    })
    db.end()

    return getInteractions.then((results) => {
      if (results) {
        return results as unknown as [Interactions]
      }
    }).catch((err) => {
      throw new Error(err)
    })
  }

  async getAllInteractions (): Promise<[Interactions]> {
    const db = mysql.createConnection(this.options)
    const getInteractions = new Promise((resolve, reject) => {
      db.query('SELECT * FROM interactions', (error: any, results: any) => {
        if (error) {
          return reject(error)
        }
        if (results.length > 0) {
          return resolve(results)
        }
        return resolve([])
      })
    })
    db.end()

    return getInteractions.then((results) => {
      if (results) {
        return results as unknown as [Interactions]
      }
    }).catch((err) => {
      throw new Error(err)
    })
  }
}
