import * as jf from 'joiful'

export class Client {
  @jf
    .string()
    .max(15)
    .required()
  public cpf: string

  @jf
    .string()
    .min(1)
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
    .max(20)
    .required()
  public password: string

  @jf
    .string()
    .max(17)
    .required()
  public phoneNumber: string

  @jf.date().required()
  public birthDate: Date

  @jf.string().required()
  public image: string

  constructor (props: Client) {
    Object.assign(this, props)
  }
}
