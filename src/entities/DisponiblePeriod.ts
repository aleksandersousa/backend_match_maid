export class DisponiblePeriod {
  public maidCpf: string
  public mornig: boolean
  public afternoon: boolean
  public night: boolean

  constructor (props: Object) {
    Object.assign(this, props)
  }
}
