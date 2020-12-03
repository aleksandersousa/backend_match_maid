export class PremiumState {
  public maidCpf: string
  public status: boolean
  public dateTimeStart: Date
  public dateTimeEnd: Date

  constructor (props: PremiumState) {
    Object.assign(this, props)
  }
}
