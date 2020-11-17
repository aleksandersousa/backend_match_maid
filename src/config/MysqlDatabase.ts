import { IDatabase } from './IDatabase'
import { Client } from '../entities/Client'
import { ClientLocation } from '../entities/ClientLocation'
import { Maid } from '../entities/Maid'
import { MaidLocation } from '../entities/MaidLocation'
import { DisponibleDays } from '../entities/DisponibleDays'
import { DisponiblePeriod } from '../entities/DisponiblePeriod'
import { Services } from '../entities/Services'
import mysql from 'mysql'

export class MySqlDatabase implements IDatabase {
  private options = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_match_maid'
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

  async saveMaid (maid: Maid, maidLocation: MaidLocation, disponibleDays: DisponibleDays,
    disponiblePeriod: DisponiblePeriod, services: Services, client: Client,
    clientLocation: ClientLocation
  ): Promise<void> {
    const props = {
      cpf: maid.cpf,
      name: maid.name,
      email: maid.email,
      password: maid.password,
      phoneNumber: maid.phoneNumber,
      birthDate: maid.birthDate
    }

    const db = mysql.createConnection(this.options)
    db.query('INSERT INTO maid SET ? ', props, (error, results) => {
      if (error) throw error
    })
    db.end()

    this.saveMaidLocation(maidLocation)
    this.saveMaidDisponibleDays(disponibleDays)
    this.saveMaidDisponiblePeriod(disponiblePeriod)
    this.saveMaidServices(services)

    this.saveClient(client, clientLocation)
  }

  async saveMaidLocation (location: MaidLocation): Promise<void> {
    const db = mysql.createConnection(this.options)
    db.query('INSERT INTO maid_location SET ? ', location, (error, results) => {
      if (error) throw error
    })
    db.end()
  }

  async saveMaidDisponibleDays (disponibleDays: DisponibleDays):Promise<void> {
    const db = mysql.createConnection(this.options)
    db.query('INSERT INTO disponible_days SET ? ', disponibleDays, (error, results) => {
      if (error) throw error
    })
    db.end()
  }

  async saveMaidDisponiblePeriod (disponiblePeriod: DisponiblePeriod):Promise<void> {
    const db = mysql.createConnection(this.options)
    db.query('INSERT INTO disponible_period SET ? ', disponiblePeriod, (error, results) => {
      if (error) throw error
    })
    db.end()
  }

  async saveMaidServices (services: Services):Promise<void> {
    const db = mysql.createConnection(this.options)
    db.query('INSERT INTO services SET ? ', services, (error, results) => {
      if (error) throw error
    })
    db.end()
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
