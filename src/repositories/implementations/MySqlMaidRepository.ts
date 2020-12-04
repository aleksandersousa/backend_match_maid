import { Client } from '../../entities/Client'
import { ClientLocation } from '../../entities/ClientLocation'
import { Maid } from '../../entities/Maid'
import { MaidLocation } from '../../entities/MaidLocation'
import { IMaidRepository } from '../IMaidRepository'
import { MySqlClientsRepository } from './MySqlClientsRepository'
import { DisponibleDays } from '../../entities/DisponibleDays'
import { DisponiblePeriod } from '../../entities/DisponiblePeriod'
import { Services } from '../../entities/Services'
import mysql from 'mysql'
import { Rating } from '../../entities/Rating'

export class MySqlMaidRepository implements IMaidRepository {
  private options = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_match_maid',
    multipleStatements: true
  }

  async saveMaid (maid: Maid, maidLocation: MaidLocation, disponibleDays: DisponibleDays,
    disponiblePeriod: DisponiblePeriod, services: Services, client: Client,
    clientLocation: ClientLocation
  ): Promise<void> {
    const db = mysql.createConnection(this.options)
    db.query('INSERT INTO maid SET ? ', maid, (error: any, results: any) => {
      if (error) {
        throw new Error(error)
      }
    })
    db.end()

    this.saveMaidLocation(maidLocation)
    this.saveMaidDisponibleDays(disponibleDays)
    this.saveMaidDisponiblePeriod(disponiblePeriod)
    this.saveMaidServices(services)

    const clientRepository = new MySqlClientsRepository()
    await clientRepository.saveClient(client, clientLocation)
  }

  async saveMaidLocation (location: MaidLocation): Promise<void> {
    const db = mysql.createConnection(this.options)
    db.query('INSERT INTO maid_location SET ? ', location, (error: any, results: any) => {
      if (error) throw error
    })
    db.end()
  }

  async saveMaidDisponibleDays (disponibleDays: DisponibleDays): Promise<void> {
    const db = mysql.createConnection(this.options)
    db.query('INSERT INTO disponible_days SET ? ', disponibleDays, (error: any, results: any) => {
      if (error) throw error
    })
    db.end()
  }

  async saveMaidDisponiblePeriod (disponiblePeriod: DisponiblePeriod): Promise<void> {
    const db = mysql.createConnection(this.options)
    db.query('INSERT INTO disponible_period SET ? ', disponiblePeriod, (error: any, results: any) => {
      if (error) throw error
    })
    db.end()
  }

  async saveMaidServices (services: Services): Promise<void> {
    const db = mysql.createConnection(this.options)
    db.query('INSERT INTO services SET ? ', services, (error: any, results: any) => {
      if (error) throw error
    })
    db.end()
  }

  async findMaidByEmail (email: string): Promise<Maid> {
    const db = mysql.createConnection(this.options)
    const getMaid = new Promise((resolve, reject) => {
      db.query('SELECT * FROM maid WHERE email = ?', [email], (error: any, results: any) => {
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
        return new Maid(results as Maid)
      }
    }).catch((err) => {
      console.log('Error on search client email: ' + err)
      return null
    })
  }

  async findMaidById (id: number): Promise<Maid> {
    const db = mysql.createConnection(this.options)
    const getMaid = new Promise((resolve, reject) => {
      db.query('SELECT * FROM maid WHERE id = ?', [id], (error: any, results: any) => {
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
        return new Maid(results as Maid)
      }
    }).catch((err) => {
      throw new Error(err)
    })
  }

  async findRatingByCpf (cpf: string): Promise<Rating> {
    const db = mysql.createConnection(this.options)
    const getRating = new Promise((resolve, reject) => {
      db.query('SELECT * FROM rating WHERE maidCpf = ?', [cpf], (error: any, results: any) => {
        if (error) throw error
        if (results.length > 0) {
          return resolve(results[0])
        }
        return resolve(null)
      })
    })
    db.end()

    return getRating.then(function (results) {
      if (results) {
        return new Rating(results as Rating)
      }
    }).catch((err) => {
      console.log('Error on search rating cpf: ' + err)
      return null
    })
  }

  async deleteMaid (cpf: string): Promise<void> {
    const db = mysql.createConnection(this.options)

    const clientRepository = new MySqlClientsRepository()
    await clientRepository.deleteClient(cpf)

    const sqlQuerie = `
      DELETE FROM maid_location WHERE maidCpf = ?;
      DELETE FROM disponible_days WHERE maidCpf = ?;
      DELETE FROM disponible_period WHERE maidCpf = ?;
      DELETE FROM services WHERE maidCpf = ?;
      DELETE FROM maid WHERE cpf = ?;
    `

    db.query(sqlQuerie, [cpf, cpf, cpf, cpf, cpf], (error: any, results: any) => {
      if (error) throw error
    })

    db.end()
  }

  async updateMaid (maid: Maid, id: number) {
    const db = mysql.createConnection(this.options)
    const sqlQuerie = `UPDATE maid SET 
      cpf = ?, 
      name = ?, 
      email = ?, 
      password = ?,
      phoneNumber = ?,
      birthDate = ?,
      status = ? WHERE id = ?`
    db.query(sqlQuerie, [
      maid.cpf,
      maid.name,
      maid.email,
      maid.password,
      maid.phoneNumber,
      maid.birthDate,
      maid.status,
      id
    ], (error: any, results: any) => {
      if (error) throw error
    })
    db.end()
  }

  async updateMaidLocation (location: MaidLocation) {
    const db = mysql.createConnection(this.options)
    const sqlQuerie = `UPDATE maid_location SET 
      maidCpf = ?, 
      latitude = ?, 
      longitude = ?, 
      street = ?,
      houseNumber = ?,
      neighborhood = ?,
      city = ?,
      cep = ?,
      uf = ? WHERE maidCpf = ?`
    db.query(sqlQuerie, [
      location.maidCpf,
      location.latitude,
      location.longitude,
      location.street,
      location.houseNumber,
      location.neighborhood,
      location.city,
      location.cep,
      location.uf,
      location.maidCpf
    ], (error: any, results: any) => {
      if (error) throw error
    })
    db.end()
  }

  async updateMaidDisponibleDays (disponibleDays: DisponibleDays) {
    const db = mysql.createConnection(this.options)
    const sqlQuerie = `UPDATE disponible_days SET 
      maidCpf = ?, 
      monday = ?, 
      tuesday = ?, 
      wednesday = ?,
      thursday = ?,
      friday = ?,
      saturday = ?,
      sunday = ? WHERE maidCpf = ?`
    db.query(sqlQuerie, [
      disponibleDays.maidCpf,
      disponibleDays.monday,
      disponibleDays.tuesday,
      disponibleDays.wednesday,
      disponibleDays.thursday,
      disponibleDays.friday,
      disponibleDays.saturday,
      disponibleDays.sunday,
      disponibleDays.maidCpf
    ], (error: any, results: any) => {
      if (error) throw error
    })
    db.end()
  }

  async updateMaidDisponiblePeriod (disponiblePeriod: DisponiblePeriod) {
    const db = mysql.createConnection(this.options)
    const sqlQuerie = `UPDATE disponible_period SET 
      maidCpf = ?, 
      morning = ?, 
      afternoon = ?, 
      night = ? WHERE maidCpf = ?`
    db.query(sqlQuerie, [
      disponiblePeriod.maidCpf,
      disponiblePeriod.morning,
      disponiblePeriod.afternoon,
      disponiblePeriod.night,
      disponiblePeriod.maidCpf
    ], (error: any, results: any) => {
      if (error) throw error
    })
    db.end()
  }

  async updateMaidServices (services: Services) {
    const db = mysql.createConnection(this.options)
    const sqlQuerie = `UPDATE services SET
      maidCpf = ?,
      nanny = ?, 
      carehouse = ?, 
      cleanHouse = ?, 
      ironClothes = ?,
      washClothes = ?,
      washDishes = ?,
      cook = ? WHERE maidCpf = ?`
    db.query(sqlQuerie, [
      services.maidCpf,
      services.nanny,
      services.careHouse,
      services.cleanHouse,
      services.ironClothes,
      services.washClothes,
      services.washDishes,
      services.cook,
      services.maidCpf
    ], (error: any, results: any) => {
      if (error) throw error
    })
    db.end()
  }

  async updateMaidRating (rating: Rating): Promise<void> {
    const db = mysql.createConnection(this.options)

    const ratingAlreadyExists = await this.findRatingByCpf(rating.maidCpf)

    if (ratingAlreadyExists) {
      const sqlQuerie = `UPDATE rating SET
        maidCpf = ?,
        stars = ?,
        goodWork = ?,
        onTime = ?,
        arrivedOnTime = ? WHERE maidCpf = ?`
      db.query(sqlQuerie, [
        rating.maidCpf,
        rating.stars,
        rating.goodWork,
        rating.onTime,
        rating.arrivedOnTime,
        rating.maidCpf
      ], (error: any, results: any) => {
        if (error) throw error
      })
    } else {
      db.query('INSERT INTO rating SET ?', rating, (error: any, response: any) => {
        if (error) throw error
      })
    }
    db.end()
  }

  async getMaid (id: number): Promise<Object> {
    const db = mysql.createConnection(this.options)

    const getMaid = await this.findMaidById(id)

    if (!getMaid) {
      throw new Error('Maid does not exist.')
    }

    const getLocation = new Promise((resolve, reject) => {
      db.query('SELECT * FROM maid_location WHERE maidCpf = ?', getMaid.cpf, (error: any, results: any) => {
        if (error) {
          throw new Error(error)
        }
        if (results.length > 0) {
          return resolve(results[0])
        }
        return resolve(null)
      })
    })

    const getDisponibleDays = new Promise((resolve, reject) => {
      db.query('SELECT * FROM disponible_days WHERE maidCpf = ?', getMaid.cpf, (error: any, results: any) => {
        if (error) {
          throw new Error(error)
        }
        if (results.length > 0) {
          return resolve(results[0])
        }
        return resolve(null)
      })
    })

    const getDisponiblePeriod = new Promise((resolve, reject) => {
      db.query('SELECT * FROM disponible_period WHERE maidCpf = ?', getMaid.cpf, (error: any, results: any) => {
        if (error) {
          throw new Error(error)
        }
        if (results.length > 0) {
          return resolve(results[0])
        }
        return resolve(null)
      })
    })

    const getServices = new Promise((resolve, reject) => {
      db.query('SELECT * FROM services WHERE maidCpf = ?', getMaid.cpf, (error: any, results: any) => {
        if (error) {
          throw new Error(error)
        }
        if (results.length > 0) {
          return resolve(results[0])
        }
        return resolve(null)
      })
    })

    const getRating = new Promise((resolve, reject) => {
      db.query('SELECT * FROM rating WHERE maidCpf = ?', getMaid.cpf, (error: any, results: any) => {
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
        return results
      }
    }).catch((err) => {
      throw new Error(err)
    })

    const disponibleDays = await getDisponibleDays.then((results) => {
      if (results) {
        return results
      }
    }).catch((err) => {
      throw new Error(err)
    })

    const disponiblePeriod = await getDisponiblePeriod.then((results) => {
      if (results) {
        return results
      }
    }).catch((err) => {
      throw new Error(err)
    })

    const services = await getServices.then((results) => {
      if (results) {
        return results
      }
    }).catch((err) => {
      throw new Error(err)
    })

    const rating = await getRating.then((results) => {
      if (results) {
        return results
      }
    }).catch((err) => {
      throw new Error(err)
    })

    const maid = {
      maid: getMaid,
      location: location,
      disponible_days: disponibleDays,
      disponible_period: disponiblePeriod,
      services: services,
      rating: rating
    }

    return maid
  }

  async getMaids (): Promise<[Maid]> {
    const db = mysql.createConnection(this.options)
    const get = new Promise((resolve, reject) => {
      db.query('SELECT * FROM maid', (error: any, results: any) => {
        if (error) throw error
        if (results.length > 0) {
          return resolve(results)
        }
        return resolve([])
      })
    })
    db.end()

    return get.then((results) => {
      if (results) {
        return results as unknown as [Maid]
      }
    }).catch((err) => {
      throw new Error(err)
    })
  }

  async getAllMaids (): Promise<[Object]> {
    const db = mysql.createConnection(this.options)

    const getMaids = this.getMaids()

    const getLocations = new Promise((resolve, reject) => {
      db.query('SELECT * FROM maid_location', (error: any, results: any) => {
        if (error) throw error
        if (results.length > 0) {
          return resolve(results)
        }
        return resolve([])
      })
    })

    const getDisponibleDays = new Promise((resolve, reject) => {
      db.query('SELECT * FROM disponible_days', (error: any, results: any) => {
        if (error) throw error
        if (results.length > 0) {
          return resolve(results)
        }
        return resolve([])
      })
    })

    const getDisponiblePeriod = new Promise((resolve, reject) => {
      db.query('SELECT * FROM disponible_period', (error: any, results: any) => {
        if (error) throw error
        if (results.length > 0) {
          return resolve(results)
        }
        return resolve([])
      })
    })

    const getServices = new Promise((resolve, reject) => {
      db.query('SELECT * FROM services', (error: any, results: any) => {
        if (error) throw error
        if (results.length > 0) {
          return resolve(results)
        }
        return resolve([])
      })
    })

    const locationList = await getLocations.then((results: any) => {
      if (results) {
        const locations = [] as unknown as [MaidLocation]
        for (let i = 0; i < results.length; i++) {
          locations.push(new MaidLocation(results[i]))
        }
        return locations
      }
    }).catch((err) => {
      console.log('Error on getting maid locations: ' + err)
      return null
    })

    const disponibleDaysList = await getDisponibleDays.then((results: any) => {
      if (results) {
        const disponibleDays = [] as unknown as [DisponibleDays]
        for (let i = 0; i < results.length; i++) {
          disponibleDays.push(new DisponibleDays(results[i]))
        }
        return disponibleDays
      }
    }).catch((err) => {
      console.log('Error on getting disponible days: ' + err)
      return null
    })

    const disponiblePeriodList = await getDisponiblePeriod.then((results: any) => {
      if (results) {
        const disponiblePeriods = [] as unknown as [DisponiblePeriod]
        for (let i = 0; i < results.length; i++) {
          disponiblePeriods.push(new DisponiblePeriod(results[i]))
        }
        return disponiblePeriods
      }
    }).catch((err) => {
      console.log('Error on getting disponible period: ' + err)
      return null
    })

    const servicesList = await getServices.then((results: any) => {
      if (results) {
        const services = [] as unknown as [Services]
        for (let i = 0; i < results.length; i++) {
          services.push(new Services(results[i]))
        }
        return services
      }
    }).catch((err) => {
      console.log('Error on getting services: ' + err)
      return null
    })

    const maids = getMaids.then((results: any) => {
      if (results) {
        const maids = []
        for (let i = 0; i < results.length; i++) {
          const maid = {
            id: results[i].id,
            name: results[i].name,
            email: results[i].email,
            phoneNumber: results[i].phoneNumber,
            birthDate: results[i].birthDate,
            status: !!results[i].status
          }
          const locations = locationList[i]
          const disponibleDays = {
            maidCpf: disponibleDaysList[i].maidCpf,
            monday: !!disponibleDaysList[i].monday,
            tuesday: !!disponibleDaysList[i].tuesday,
            wednesday: !!disponibleDaysList[i].wednesday,
            thursday: !!disponibleDaysList[i].thursday,
            friday: !!disponibleDaysList[i].friday,
            saturday: !!disponibleDaysList[i].saturday,
            sunday: !!disponibleDaysList[i].sunday
          }
          const disponiblePeriods = {
            maidCpf: disponiblePeriodList[i].maidCpf,
            morning: !!disponiblePeriodList[i].morning,
            afternoon: !!disponiblePeriodList[i].afternoon,
            night: !!disponiblePeriodList[i].night
          }
          const services = {
            maidCpf: servicesList[i].maidCpf,
            nanny: !!servicesList[i].nanny,
            careHouse: !!servicesList[i].careHouse,
            cleanHouse: !!servicesList[i].cleanHouse,
            ironClothes: !!servicesList[i].ironClothes,
            washClothes: !!servicesList[i].washClothes,
            washDishes: !!servicesList[i].washDishes,
            cook: !!servicesList[i].cook
          }
          maids.push({
            maid,
            locations,
            disponibleDays,
            disponiblePeriods,
            services
          })
        }
        return maids
      }
    }).catch((err) => {
      console.log('Error on getting all maids: ' + err)
      return null
    })

    return maids
  }
}
