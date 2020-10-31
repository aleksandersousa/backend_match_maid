export class Rating {
  private _maidCpf: string
  private _stars: string
  private _goodWork: boolean
  private _onTime: boolean
  private _arrivedOnTime: boolean

  constructor (props: Object) {
    Object.assign(this, props)
  }

  get maidCpf (): string {
    return this._maidCpf
  }

  get stars (): string {
    return this._stars
  }

  set stars (value: string) {
    this._stars = value
  }

  get goodWork (): boolean {
    return this._goodWork
  }

  set goodWork (value: boolean) {
    this._goodWork = value
  }

  get onTime (): boolean {
    return this._onTime
  }

  set onTime (value: boolean) {
    this._onTime = value
  }

  get arrivedOnTime (): boolean {
    return this._arrivedOnTime
  }

  set arrivedOnTime (value: boolean) {
    this._arrivedOnTime = value
  }
}
