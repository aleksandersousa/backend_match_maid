export class Maid {
  public cpf: string
  public name: string
  public email: string
  public password: string
  public phoneNumber: string
  public birthDate: Date
  public status: boolean

  constructor (props: Object) {
    Object.assign(this, props)
  }
}
