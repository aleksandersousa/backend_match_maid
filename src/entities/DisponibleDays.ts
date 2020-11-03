export class DisponibleDays {
  public maidCpf: string
  public monday: boolean
  public tuesday: boolean
  public wednesday: boolean
  public thursday: boolean
  public friday: boolean
  public saturday: boolean
  public sunday: boolean

  constructor (props: Object) {
    Object.assign(this, props)
  }
}
