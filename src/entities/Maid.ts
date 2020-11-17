import { DisponibleDays } from './DisponibleDays'
import { DisponiblePeriod } from './DisponiblePeriod'
import { MaidLocation } from './MaidLocation'
import { Services } from './Services'

export class Maid {
  public cpf: string
  public name: string
  public email: string
  public password: string
  public phoneNumber: string
  public birthDate: Date
  public status: boolean
  public location: MaidLocation
  public disponibleDays: DisponibleDays
  public disponiblePeriod: DisponiblePeriod
  public services: Services

  constructor (props: Object) {
    Object.assign(this, props)
  }
}
