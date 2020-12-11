import * as jf from 'joiful'

export class Client {
  public readonly id: number

  @jf
    .string()
    .max(15)
    .required()
  public cpf: string

  @jf
    .string()
    .max(50)
    .required()
  public name: string

  @jf
    .string()
    .email()
    .max(50)
    .required()
  public email: string

  @jf
    .string()
    .min(8)
    .required()
  public password: string

  @jf
    .string()
    .max(17)
    .required()
  public phoneNumber: string

  @jf.date().required()
  public birthDate: Date

  @jf.string()
  public image: string

  constructor (props: Omit<Client, 'id'>) {
    Object.assign(this, props)
  }
}
