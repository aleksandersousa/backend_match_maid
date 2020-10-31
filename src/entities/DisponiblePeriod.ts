export class DisponiblePeriod {
  private _maidCpf: string
  private _mornig: boolean
  private _afternoon: boolean
  private _night: boolean

  constructor (props: DisponiblePeriod) {
    Object.assign(this, props)
  }

  get maidCpf (): string {
    return this._maidCpf
  }

  get morning (): boolean {
    return this._mornig
  }

  set morning (value: boolean) {
    this._mornig = value
  }

  get afternoon (): boolean {
    return this._afternoon
  }

  set afternoon (value: boolean) {
    this._afternoon = value
  }

  get night (): boolean {
    return this._night
  }

  set night (value: boolean) {
    this._night = value
  }
}
