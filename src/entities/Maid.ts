export class Maid {
  private _cpf: string
  private _name: string
  private _email: string
  private _password: string
  private _phoneNumber: string
  private _birthDate: Date
  private _status: boolean

  constructor (props: Maid) {
    Object.assign(this, props)
  }

  get cpf (): string {
    return this._cpf
  }

  get name (): string {
    return this._name
  }

  set name (value: string) {
    this._name = value
  }

  get email (): string {
    return this._email
  }

  set email (value: string) {
    this._email = value
  }

  get password (): string {
    return this._password
  }

  set password (value: string) {
    this._password = value
  }

  get phoneNumber (): string {
    return this._phoneNumber
  }

  set phoneNumber (value: string) {
    this._phoneNumber = value
  }

  get birthDate (): Date {
    return this._birthDate
  }

  set birthDate (value: Date) {
    this._birthDate = value
  }

  get status (): boolean {
    return this._status
  }

  set status (value: boolean) {
    this._status = value
  }
}