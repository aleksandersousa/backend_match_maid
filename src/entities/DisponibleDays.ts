export class DisponibleDays {
  private _maidCpf: string
  private _monday: boolean
  private _tuesday: boolean
  private _wednesday: boolean
  private _thursday: boolean
  private _friday: boolean
  private _saturday: boolean
  private _sunday: boolean

  constructor (props: Object) {
    Object.assign(this, props)
  }

  get maidCpf (): string {
    return this._maidCpf
  }

  get monday (): boolean {
    return this._monday
  }

  set monday (value: boolean) {
    this._monday = value
  }

  get tuesday (): boolean {
    return this._tuesday
  }

  set tuesday (value: boolean) {
    this._tuesday = value
  }

  get wednesday (): boolean {
    return this._wednesday
  }

  set wednesday (value: boolean) {
    this._wednesday = value
  }

  get thursday (): boolean {
    return this._thursday
  }

  set thursday (value: boolean) {
    this._thursday = value
  }

  get friday (): boolean {
    return this._friday
  }

  set friday (value: boolean) {
    this._friday = value
  }

  get saturday (): boolean {
    return this._saturday
  }

  set saturday (value: boolean) {
    this._saturday = value
  }

  get sunday (): boolean {
    return this._sunday
  }

  set sunday (value: boolean) {
    this._sunday = value
  }
}
