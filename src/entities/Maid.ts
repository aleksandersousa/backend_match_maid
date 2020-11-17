import { MaidLocation } from './MaidLocation'

export class Maid {
  public cpf: string
  public name: string
  public email: string
  public password: string
  public phoneNumber: string
  public birthDate: Date
  public status: boolean
  public location: MaidLocation

  constructor (props: Object) {
    Object.assign(this, props)
  }
}
