import { ClientLocation } from './ClientLocation'

export class Client {
  public cpf: string
  public name: string
  public email: string
  public password: string
  public phoneNumber: string
  public birthDate: Date
  public location: ClientLocation

  constructor (props: Object) {
    Object.assign(this, props)
  }
}
