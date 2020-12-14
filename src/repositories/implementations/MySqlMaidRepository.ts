import { Client } from '../../entities/Client'
import { ClientLocation } from '../../entities/ClientLocation'
import { Maid } from '../../entities/Maid'
import { MaidLocation } from '../../entities/MaidLocation'
import { IMaidRepository } from '../IMaidRepository'
import { DisponibleDays } from '../../entities/DisponibleDays'
import { DisponiblePeriod } from '../../entities/DisponiblePeriod'
import { Services } from '../../entities/Services'
import mysql from 'mysql'
import { Rating } from '../../entities/Rating'
import { MySqlInteractionRepository } from './MySqlInteractionsRepository'
// import { MySqlClientsRepository } from './MySqlClientsRepository'

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
    const sqlQuery = `
      INSERT INTO maid SET ?;
      INSERT INTO maid_location SET ?;
      INSERT INTO disponible_days SET ?;
      INSERT INTO disponible_period SET ?;
      INSERT INTO services SET ?;
      INSERT INTO client SET ?;
      INSERT INTO client_location SET ?;`
    db.query(sqlQuery, [
      maid,
      maidLocation,
      disponibleDays,
      disponiblePeriod,
      services,
      client,
      clientLocation
    ], (error: any, results: any) => {
      if (error) {
        return new Error(error)
      }
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

  async deleteMaid (cpf: string): Promise<void> {
    const db = mysql.createConnection(this.options)

    const sqlQuery = `
      DELETE FROM maid_location WHERE maidCpf = ?;
      DELETE FROM disponible_days WHERE maidCpf = ?;
      DELETE FROM disponible_period WHERE maidCpf = ?;
      DELETE FROM services WHERE maidCpf = ?;
      DELETE FROM maid WHERE cpf = ?;
      DELETE FROM client_location WHERE Clientcpf = ?;
      DELETE FROM client WHERE cpf = ?;
    `

    db.query(sqlQuery, [cpf, cpf, cpf, cpf, cpf, cpf, cpf], (error: any, results: any) => {
      if (error) throw error
    })

    db.end()
  }

  async updateMaid (maid: Maid, id: number) {
    const db = mysql.createConnection(this.options)
    const sqlQuery = `UPDATE maid SET 
      cpf = ?, 
      name = ?, 
      email = ?, 
      password = ?,
      phoneNumber = ?,
      birthDate = ?,
      status = ?,
      bibliography = ?,
      pricePerHour = ?,
      numberOfVisits = ? WHERE id = ?`
    db.query(sqlQuery, [
      maid.cpf,
      maid.name,
      maid.email,
      maid.password,
      maid.phoneNumber,
      maid.birthDate,
      maid.status,
      maid.bibliography,
      maid.pricePerHour,
      maid.numberOfVisits,
      id
    ], (error: any, results: any) => {
      if (error) throw error
    })

    const sqlQuery2 = `UPDATE client SET 
      cpf = ?, 
      name = ?, 
      email = ?, 
      password = ?,
      phoneNumber = ?,
      birthDate = ? WHERE id = ?`
    db.query(sqlQuery2, [
      maid.cpf,
      maid.name,
      maid.email,
      maid.password,
      maid.phoneNumber,
      maid.birthDate,
      id
    ], (error: any, results: any) => {
      if (error) throw error
    })
    db.end()
  }

  async updateMaidLocation (location: MaidLocation) {
    const db = mysql.createConnection(this.options)
    const sqlQuery = `UPDATE maid_location SET 
      maidCpf = ?, 
      latitude = ?, 
      longitude = ?, 
      street = ?,
      houseNumber = ?,
      neighborhood = ?,
      city = ?,
      cep = ?,
      uf = ? WHERE maidCpf = ?`
    db.query(sqlQuery, [
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
    const sqlQuery = `UPDATE disponible_days SET 
      maidCpf = ?, 
      monday = ?, 
      tuesday = ?, 
      wednesday = ?,
      thursday = ?,
      friday = ?,
      saturday = ?,
      sunday = ? WHERE maidCpf = ?`
    db.query(sqlQuery, [
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
    const sqlQuery = `UPDATE disponible_period SET 
      maidCpf = ?, 
      morning = ?, 
      afternoon = ?, 
      night = ? WHERE maidCpf = ?`
    db.query(sqlQuery, [
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
    const sqlQuery = `UPDATE services SET
      maidCpf = ?,
      nanny = ?, 
      carehouse = ?, 
      cleanHouse = ?, 
      ironClothes = ?,
      washClothes = ?,
      washDishes = ?,
      cook = ? WHERE maidCpf = ?`
    db.query(sqlQuery, [
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

  async createMaidRating (rating: Rating): Promise<void> {
    const db = mysql.createConnection(this.options)
    db.query('INSERT INTO rating SET ?', rating, (error: any, response: any) => {
      if (error) throw error
    })
    db.end()
  }

  async getRatings (maidCpf: string): Promise<[Object]> {
    const db = mysql.createConnection(this.options)
    const get = new Promise((resolve, reject) => {
      db.query('SELECT * FROM rating WHERE maidCpf = ?', maidCpf, (err, results) => {
        if (err) {
          return reject(err)
        }
        if (results.length > 0) {
          return resolve(results)
        }
        return resolve([])
      })
    })
    db.end()

    return get.then((results: any) => {
      if (results) {
        const ratings = []
        for (let i = 0; i < results.length; i++) {
          const rating = {
            clientId: results[i].clientId,
            clientName: results[i].clientName,
            stars: results[i].stars,
            goodWork: results[i].goodWork,
            onTime: results[i].onTime,
            arrivedOnTime: results[i].arrivedOnTime
          }
          ratings.push(rating)
        }

        return ratings as unknown as [Object]
      }
    }).catch((err) => {
      throw new Error(err)
    })
  }

  async getMaid (id: number, all?: boolean): Promise<Object> {
    const db = mysql.createConnection(this.options)
    const interactionsRepository = new MySqlInteractionRepository()

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
          return resolve(results)
        }
        return resolve([])
      })
    })

    const getInteractions = await interactionsRepository.getInteractionsById(getMaid.id)

    db.end()

    const location = await getLocation.then((results) => {
      if (results) {
        return results as MaidLocation
      }
    }).catch((err) => {
      throw new Error(err)
    })

    const disponibleDays = await getDisponibleDays.then((results) => {
      if (results) {
        return results as DisponibleDays
      }
    }).catch((err) => {
      throw new Error(err)
    })

    const disponiblePeriod = await getDisponiblePeriod.then((results) => {
      if (results) {
        return results as DisponiblePeriod
      }
    }).catch((err) => {
      throw new Error(err)
    })

    const services = await getServices.then((results) => {
      if (results) {
        return results as Services
      }
    }).catch((err) => {
      throw new Error(err)
    })

    const ratings = await getRating.then((results) => {
      if (results) {
        return results as [Rating]
      }
    }).catch((err) => {
      throw new Error(err)
    })

    let tempMaid = {}

    tempMaid = {
      id: getMaid.id,
      name: getMaid.name,
      email: getMaid.email,
      phoneNumber: getMaid.phoneNumber,
      birthDate: getMaid.birthDate,
      status: !!getMaid.status,
      bibliography: getMaid.bibliography,
      pricePerHour: getMaid.pricePerHour,
      numberOfVisits: getMaid.numberOfVisits,
      image: getMaid.image
    }

    const tempDisponibleDays = {
      monday: !!disponibleDays.monday,
      tuesday: !!disponibleDays.tuesday,
      wednesday: !!disponibleDays.wednesday,
      thursday: !!disponibleDays.thursday,
      friday: !!disponibleDays.friday,
      saturday: !!disponibleDays.saturday,
      sunday: !!disponibleDays.sunday
    }

    const tempDisponiblePeriod = {
      morning: !!disponiblePeriod.morning,
      afternoon: !!disponiblePeriod.afternoon,
      night: !!disponiblePeriod.night
    }

    const tempServices = {
      nanny: !!services.nanny,
      careHouse: !!services.careHouse,
      cleanHouse: !!services.cleanHouse,
      ironClothes: !!services.ironClothes,
      washClothes: !!services.washClothes,
      washDishes: !!services.washDishes,
      cook: !!services.cook
    }

    let tempRatings = []
    if (all) {
      tempMaid = getMaid
      tempRatings = ratings
    } else {
      for (let i = 0; i < ratings.length; i++) {
        const rating = {
          clientId: ratings[i].clientId,
          name: ratings[i].clientName,
          stars: ratings[i].stars,
          goodWork: !!ratings[i].goodWork,
          onTime: !!ratings[i].onTime,
          arrivedOnTime: !!ratings[i].arrivedOnTime
        }
        tempRatings.push(rating)
      }
    }

    const maid = {
      maid: tempMaid,
      locations: location,
      disponibleDays: tempDisponibleDays,
      disponiblePeriods: tempDisponiblePeriod,
      services: tempServices,
      ratings: tempRatings,
      interactions: getInteractions
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

    const maids = getMaids.then(async (results: any) => {
      if (results) {
        const maids = []
        const interactionsRepository = new MySqlInteractionRepository()

        for (let i = 0; i < results.length; i++) {
          const ratings = await this.getRatings(results[i].cpf)
          const interactions = await interactionsRepository.getInteractionsById(results[i].id)

          const maid = {
            id: results[i].id,
            name: results[i].name,
            email: results[i].email,
            phoneNumber: results[i].phoneNumber,
            birthDate: results[i].birthDate,
            status: !!results[i].status,
            bibliography: results[i].bibliography,
            pricePerHour: results[i].pricePerHour,
            numberOfVisits: results[i].numberOfVisits,
            image: results[i].image
          }

          const locations = {
            latitude: locationList[i].latitude,
            longitude: locationList[i].longitude,
            street: locationList[i].street,
            houseNumber: locationList[i].houseNumber,
            neighborhood: locationList[i].neighborhood,
            complement: locationList[i].complement,
            city: locationList[i].city,
            cep: locationList[i].cep,
            uf: locationList[i].uf
          }

          const disponibleDays = {
            monday: !!disponibleDaysList[i].monday,
            tuesday: !!disponibleDaysList[i].tuesday,
            wednesday: !!disponibleDaysList[i].wednesday,
            thursday: !!disponibleDaysList[i].thursday,
            friday: !!disponibleDaysList[i].friday,
            saturday: !!disponibleDaysList[i].saturday,
            sunday: !!disponibleDaysList[i].sunday
          }
          const disponiblePeriods = {
            morning: !!disponiblePeriodList[i].morning,
            afternoon: !!disponiblePeriodList[i].afternoon,
            night: !!disponiblePeriodList[i].night
          }
          const services = {
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
            services,
            ratings,
            interactions
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
