export class Client {
  public cpf: string
  public name: string
  public email: string
  public password: string
  public phoneNumber: string
  public birthDate: Date

  constructor (props: Object) {
    Object.assign(this, props)
  }
}
