import { Client } from '../../entities/Client'
import { IClientRepository } from '../IClientRepository'
import { ClientLocation } from '../../entities/ClientLocation'
import mysql from 'mysql'

export class MySqlClientsRepository implements IClientRepository {
  private options = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_match_maid',
    multipleStatements: true
  }

  async findClientByEmail (email: string): Promise<Client> {
    const db = mysql.createConnection(this.options)
    const getClient = new Promise((resolve, reject) => {
      db.query('SELECT * FROM client WHERE email = ?', [email], (error, results) => {
        if (error) throw error
        if (results.length > 0) return resolve(results[0])
        return resolve(null)
      })
    })
    db.end()

    return getClient.then(function (results) {
      if (results) return new Client(results as Client)
    }).catch((err) => {
      console.log('Error on database search email client querie: ' + err)
      return null
    })
  }

  async findClientById (id: number): Promise<Client> {
    const db = mysql.createConnection(this.options)
    const getClient = new Promise((resolve, reject) => {
      db.query('SELECT * FROM client WHERE id = ?', [id], (error, results) => {
        if (error) throw error
        if (results.length > 0) return resolve(results[0])
        return resolve(null)
      })
    })
    db.end()

    return getClient.then(function (results) {
      if (results) return new Client(results as Client)
    }).catch((err) => {
      console.log('Error on database search cpf client querie: ' + err)
      return null
    })
  }

  async saveClient (client: Client, location: ClientLocation): Promise<void> {
    const db = mysql.createConnection(this.options)
    db.query('INSERT INTO client SET ? ', client, (error, results) => {
      if (error) throw error
    })
    db.end()

    this.saveClientLocation(location)
  }

  async saveClientLocation (location: ClientLocation): Promise<void> {
    const db = mysql.createConnection(this.options)
    db.query('INSERT INTO client_location SET ? ', location, (error, results) => {
      if (error) throw error
    })
    db.end()
  }

  async deleteClient (cpf: string): Promise<void> {
    const db = mysql.createConnection(this.options)
    const sqlQuery = `
      DELETE FROM client_location WHERE clientCpf = ?;
      DELETE FROM client WHERE cpf = ?;
    `
    db.query(sqlQuery, [cpf, cpf], (error, results) => {
      if (error) throw error
    })
    db.end()
  }

  async updateClient (client: Client, id: number): Promise<void> {
    const db = mysql.createConnection(this.options)
    const sqlQuery = `UPDATE client SET  
      name = ?, 
      email = ?, 
      password = ?,
      phoneNumber = ?,
      birthDate = ? WHERE id = ?`
    db.query(sqlQuery, [
      client.name,
      client.email,
      client.password,
      client.phoneNumber,
      client.birthDate,
      id
    ], (error, results) => {
      if (error) throw error
    })

    db.end()
  }

  async updateClientLocation (location: ClientLocation): Promise<void> {
    const db = mysql.createConnection(this.options)
    const sqlQuery = `UPDATE client_location SET 
      clientCpf = ?, 
      latitude = ?, 
      longitude = ?, 
      street = ?,
      houseNumber = ?,
      neighborhood = ?,
      city = ?,
      cep = ?,
      uf = ? WHERE clientCpf = ?`
    db.query(sqlQuery, [
      location.clientCpf,
      location.latitude,
      location.longitude,
      location.street,
      location.houseNumber,
      location.neighborhood,
      location.city,
      location.cep,
      location.uf,
      location.clientCpf
    ], (error, results) => {
      if (error) throw error
    })
    db.end()
  }

  async getClients (): Promise<[Client]> {
    const db = mysql.createConnection(this.options)
    const get = new Promise((resolve, reject) => {
      db.query('SELECT * FROM client', (error: any, results: any) => {
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

    return get.then((results) => {
      if (results) {
        return results as unknown as [Client]
      }
    }).catch((error) => {
      throw new Error(error)
    })
  }
}
