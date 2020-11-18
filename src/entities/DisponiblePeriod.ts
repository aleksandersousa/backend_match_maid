import * as jf from 'joiful'

export class DisponiblePeriod {
  @jf
    .string()
    .max(15)
    .required()
  public maidCpf: string

  @jf.boolean().required()
  public mornig: boolean

  @jf.boolean().required()
  public afternoon: boolean

  @jf.boolean().required()
  public night: boolean

  constructor (props: Object) {
    Object.assign(this, props)
  }
}
