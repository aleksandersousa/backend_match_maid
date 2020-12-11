import * as jf from 'joiful'

export class Rating {
  @jf
    .string()
    .max(15)
    .required()
  public maidCpf: string

  @jf
    .number()
    .required()
  clientId: number

  @jf
    .string()
    .required()
  clientName: string

  @jf
    .number()
    .required()
  public stars: number

  @jf
    .boolean()
    .required()
  public goodWork: boolean

  @jf
    .boolean()
    .required()
  public onTime: boolean

  @jf
    .boolean()
    .required()
  public arrivedOnTime: boolean

  constructor (props: Rating) {
    Object.assign(this, props)
  }
}
