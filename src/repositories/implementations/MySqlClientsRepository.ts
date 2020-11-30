import { Client } from '../../entities/Client'
import { IClientRepository } from '../IClientRepository'
import { ClientLocation } from '../../entities/ClientLocation'
import mysql from 'mysql'

export class MySqlClientsRepository implements IClientRepository {
  private options = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_match_maid'
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
      if (results) return new Client(results)
    }).catch((err) => {
      console.log('Error on database search email client querie: ' + err)
      return null
    })
  }

  async findClientByCpf (cpf: string): Promise<Client> {
    const db = mysql.createConnection(this.options)
    const getClient = new Promise((resolve, reject) => {
      db.query('SELECT * FROM client WHERE cpf = ?', [cpf], (error, results) => {
        if (error) throw error
        if (results.length > 0) return resolve(results[0])
        return resolve(null)
      })
    })
    db.end()

    return getClient.then(function (results) {
      if (results) return new Client(results)
    }).catch((err) => {
      console.log('Error on database search cpf client querie: ' + err)
      return null
    })
  }

  async saveClient (client: Client, location: ClientLocation): Promise<void> {
    const props = {
      cpf: client.cpf,
      name: client.name,
      email: client.email,
      password: client.password,
      phoneNumber: client.phoneNumber,
      birthDate: client.birthDate
    }

    const db = mysql.createConnection(this.options)
    db.query('INSERT INTO client SET ? ', props, (error, results) => {
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
    db.query('DELETE FROM client_location WHERE clientCpf = ?', cpf, (error, results) => {
      if (error) throw error
    })
    db.query('DELETE FROM client WHERE cpf = ?', cpf, (error, results) => {
      if (error) throw error
    })
    db.end()
  }

  async updateClient (client: Client): Promise<void> {
    const db = mysql.createConnection(this.options)
    const sqlQuerie = `UPDATE client SET 
      cpf = ?, 
      name = ?, 
      email = ?, 
      password = ?,
      phoneNumber = ?,
      birthDate = ? WHERE cpf = ?`
    db.query(sqlQuerie, [
      client.cpf,
      client.name,
      client.email,
      client.password,
      client.phoneNumber,
      client.birthDate,
      client.cpf
    ], (error, results) => {
      if (error) throw error
    })
    db.end()
  }

  async updateClientLocation (location: ClientLocation): Promise<void> {
    const db = mysql.createConnection(this.options)
    const sqlQuerie = `UPDATE client_location SET 
      clientCpf = ?, 
      latitude = ?, 
      longitude = ?, 
      street = ?,
      houseNumber = ?,
      neighborhood = ?,
      city = ?,
      cep = ?,
      uf = ? WHERE clientCpf = ?`
    db.query(sqlQuerie, [
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
}
