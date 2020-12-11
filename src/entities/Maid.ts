import * as jf from 'joiful'

export class Maid {
  public readonly id: number

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
    .required()
  public password: string

  @jf
    .string()
    .max(17)
    .required()
  public phoneNumber: string

  @jf.date().required()
  public birthDate: Date

  @jf.boolean().required()
  public status: boolean

  @jf.string().required()
  public bibliography: string

  @jf
    .number()
    .max(65)
    .precision(2)
    .required()
  public pricePerHour: number

  @jf.number().required()
  public numberOfVisits: number

  @jf.string()
  public image: string

  constructor (props: Omit<Maid, 'id'>) {
    Object.assign(this, props)
  }
}
