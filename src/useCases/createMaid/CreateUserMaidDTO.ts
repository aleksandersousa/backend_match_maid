import { DisponibleDays } from '../../entities/DisponibleDays'
import { DisponiblePeriod } from '../../entities/DisponiblePeriod'
import { Services } from '../../entities/Services'
import { MaidLocation } from '../../entities/MaidLocation'

export class ICreateUserMaidRequestDTO {
  cpf: string
  name: string
  email: string
  password: string
  phoneNumber: string
  birthDate: Date
  status: boolean
  location: MaidLocation
  disponibleDays: DisponibleDays
  disponiblePeriod: DisponiblePeriod
  services: Services
}
