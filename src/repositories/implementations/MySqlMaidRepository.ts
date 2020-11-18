import { Client } from '../../entities/Client'
import { ClientLocation } from '../../entities/ClientLocation'
import { Maid } from '../../entities/Maid'
import { MaidLocation } from '../../entities/MaidLocation'
import { IMaidRepository } from '../IMaidRepository'
import { MySqlClientsRepository } from './MySqlClientsRepository'
import { DisponibleDays } from 'src/entities/DisponibleDays'
import { DisponiblePeriod } from 'src/entities/DisponiblePeriod'
import { Services } from 'src/entities/Services'
import mysql from 'mysql'

export class MySqlMaidRepository implements IMaidRepository {
  private options = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_match_maid'
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

    const clientRepository = new MySqlClientsRepository()
    clientRepository.saveClient(client, clientLocation)
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
