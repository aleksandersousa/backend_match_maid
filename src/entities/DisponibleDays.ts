import * as jf from 'joiful'

export class DisponibleDays {
  @jf
    .string()
    .max(15)
    .required()
  public maidCpf: string

  @jf.boolean().required()
  public monday: boolean

  @jf.boolean().required()
  public tuesday: boolean

  @jf.boolean().required()
  public wednesday: boolean

  @jf.boolean().required()
  public thursday: boolean

  @jf.boolean().required()
  public friday: boolean

  @jf.boolean().required()
  public saturday: boolean

  @jf.boolean().required()
  public sunday: boolean

  constructor (props: DisponibleDays) {
    Object.assign(this, props)
  }
}
