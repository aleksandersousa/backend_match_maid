export class PremiumState {
  private _maidCpf: string
  private _status: boolean
  private _dateTimeStart: Date
  private _dateTimeEnd: Date

  constructor (props: Object) {
    Object.assign(this, props)
  }

  get maidCpf (): string {
    return this._maidCpf
  }

  get status (): boolean {
    return this._status
  }

  set status (value: boolean) {
    this._status = value
  }

  get dateTimeStart (): Date {
    return this._dateTimeStart
  }

  set dateTimeStart (value: Date) {
    this._dateTimeStart = value
  }

  get dateTimeEnd (): Date {
    return this._dateTimeEnd
  }

  set dateTimeEnd (value: Date) {
    this._dateTimeEnd = value
  }
}
