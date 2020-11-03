export class PremiumState {
  public maidCpf: string
  public status: boolean
  public dateTimeStart: Date
  public dateTimeEnd: Date

  constructor (props: Object) {
    Object.assign(this, props)
  }
}
