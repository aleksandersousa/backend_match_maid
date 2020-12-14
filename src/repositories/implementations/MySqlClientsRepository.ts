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
    const sqlQuery = `
      INSERT INTO client SET ?;
      INSERT INTO client_location SET ?;
    `
    db.query(sqlQuery, [client, location], (error: any, results: any) => {
      if (error) {
        return new Error(error)
      }
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

  async getClient (id: number, all?: boolean): Promise<Object> {
    const db = mysql.createConnection(this.options)

    const getClient = await this.findClientById(id)

    if (!getClient) {
      throw new Error('Client does not exist.')
    }

    const getLocation = new Promise((resolve, reject) => {
      db.query('SELECT * FROM client_location WHERE clientCpf = ?', getClient.cpf, (error: any, results: any) => {
        if (error) {
          throw new Error(error)
        }
        if (results.length > 0) {
          return resolve(results[0])
        }
        return resolve(null)
      })
    })

    db.end()

    const location = await getLocation.then((results) => {
      if (results) {
        return results as ClientLocation
      }
    }).catch((err) => {
      throw new Error(err)
    })

    let tempClient = {}
    tempClient = {
      id: getClient.id,
      name: getClient.name,
      email: getClient.email,
      phoneNumber: getClient.phoneNumber,
      birthDate: getClient.birthDate,
      image: getClient.image
    }

    const tempLocation = {
      latitude: location.latitude,
      longitude: location.longitude,
      street: location.street,
      houseNumber: location.houseNumber,
      complement: location.complement,
      neighborhood: location.neighborhood,
      city: location.city,
      cep: location.cep,
      uf: location.uf
    }

    if (all) {
      tempClient = getClient
    }

    const client = {
      client: tempClient,
      locations: tempLocation
    }

    return client
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

  async listAllClients (): Promise<[Object]> {
    const db = mysql.createConnection(this.options)

    const getClients = await this.getClients()

    const getLocations = new Promise((resolve, reject) => {
      db.query('SELECT * FROM client_location', (error: any, results: any) => {
        if (error) throw error
        if (results.length > 0) {
          return resolve(results)
        }
        return resolve([])
      })
    })

    db.end()

    const locationList = await getLocations.then((results: any) => {
      if (results) {
        const locations = [] as unknown as [Object]
        for (let i = 0; i < results.length; i++) {
          const location = {
            latitude: results[i].latitude,
            longitude: results[i].longitude,
            street: results[i].street,
            houseNumber: results[i].houseNumber,
            complement: results[i].complement,
            neighborhood: results[i].neighborhood,
            city: results[i].city,
            cep: results[i].cep,
            uf: results[i].uf
          }
          locations.push(location)
        }
        return locations
      }
    }).catch((err) => {
      return new Error(err)
    })

    const clients = []
    for (let i = 0; i < getClients.length; i++) {
      const client = {
        id: getClients[i].id,
        name: getClients[i].name,
        email: getClients[i].email,
        phoneNumber: getClients[i].phoneNumber,
        birthDate: getClients[i].birthDate,
        image: getClients[i].image
      }
      clients.push({
        client: client,
        location: locationList[i]
      })
    }

    return clients as [Object]
  }
}
