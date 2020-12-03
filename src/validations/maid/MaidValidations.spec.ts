import { Rating } from '../../entities/Rating'
import { DisponibleDays } from '../../entities/DisponibleDays'
import { DisponiblePeriod } from '../../entities/DisponiblePeriod'
import { Maid } from '../../entities/Maid'
import { MaidLocation } from '../../entities/MaidLocation'
import { Services } from '../../entities/Services'
import { MaidValidations } from './MaidValidations'

describe('Testing maid validations', () => {
  let maid: Maid
  let maidLocation: MaidLocation
  let disponibleDays: DisponibleDays
  let disponiblePeriod: DisponiblePeriod
  let services: Services
  let rating: Rating
  let maidValidations: MaidValidations

  beforeAll(() => {
    const data = {
      cpf: '000.000.000-01',
      name: 'Test User',
      email: 'email@test.com',
      password: '12345678',
      phoneNumber: '00000000000000',
      birthDate: '1999-06-26 18:25:43',
      status: false,
      bibliography: 'bibliography',
      pricePerHour: 0.00,
      numberOfVisits: 0,
      image: 'image'
    }

    const location = {
      maidCpf: '000.000.000-01',
      latitude: -14.525221,
      longitude: -40.363233,
      street: 'Street Test',
      houseNumber: '00',
      complement: 'test',
      neighborhood: 'Test',
      city: 'TestCity',
      cep: '00000-000',
      uf: 'TS'
    }

    const days = {
      maidCpf: '000.000.000-01',
      monday: false,
      tuesday: false,
      wednesday: true,
      thursday: false,
      friday: false,
      saturday: true,
      sunday: true
    }

    const period = {
      maidCpf: '000.000.000-01',
      morning: true,
      afternoon: true,
      night: false
    }

    const serv = {
      maidCpf: '000.000.000-01',
      nanny: false,
      careHouse: false,
      cleanHouse: true,
      ironClothes: true,
      washClothes: true,
      washDishes: true,
      cook: false
    }

    const rat = {
      maidCpf: '000.000.000-01',
      stars: 8.7,
      goodWork: true,
      onTime: true,
      arrivedOnTime: false
    }

    maid = new Maid(data as unknown as Maid)
    maidLocation = new MaidLocation(location)
    disponibleDays = new DisponibleDays(days)
    disponiblePeriod = new DisponiblePeriod(period)
    services = new Services(serv)
    rating = new Rating(rat)
    maidValidations = new MaidValidations()
  })

  it('should detect error in maid attributes', () => {
    const error = maidValidations.checkMaidError(maid)

    expect(error || false).toBe(false)
  })

  it('should detect error in maidLocation attributes', () => {
    const error = maidValidations.checkMaidLocationError(maidLocation)

    expect(error || false).toBe(false)
  })

  it('should detect error in disponibleDays attributes', () => {
    const error = maidValidations.checkMaidDisponibleDaysError(disponibleDays)

    expect(error || false).toBe(false)
  })

  it('should detect error in disponiblePeriod attributes', () => {
    const error = maidValidations.checkMaidDisponiblePeriodError(disponiblePeriod)

    expect(error || false).toBe(false)
  })

  it('should detect error in services attributes', () => {
    const error = maidValidations.checkMaidServicesError(services)

    expect(error || false).toBe(false)
  })

  it('should detect error in rating attributes', () => {
    const error = maidValidations.checkMaidRatingError(rating)

    expect(error || false).toBe(false)
  })
})
