export class Services {
  private _maidCpf: string
  private _nanny: boolean
  private _careHouse: boolean
  private _cleanHouse: boolean
  private _ironClothes: boolean
  private _washClothes: boolean
  private _washDishes: boolean
  private _cook: boolean

  constructor (props: Services) {
    Object.assign(this, props)
  }

  get maidCpf (): string {
    return this._maidCpf
  }

  get nanny (): boolean {
    return this._nanny
  }

  set nanny (value: boolean) {
    this._nanny = value
  }

  get careHouse (): boolean {
    return this._careHouse
  }

  set careHouse (value: boolean) {
    this._careHouse = value
  }

  get cleanHouse (): boolean {
    return this._cleanHouse
  }

  set cleanHouse (value: boolean) {
    this._cleanHouse = value
  }

  get ironClothes (): boolean {
    return this._ironClothes
  }

  set ironClothes (value: boolean) {
    this._ironClothes = value
  }

  get washClothes (): boolean {
    return this._washClothes
  }

  set washClothes (value: boolean) {
    this._washClothes = value
  }

  get washDishes (): boolean {
    return this._washDishes
  }

  set washDishes (value: boolean) {
    this._washDishes = value
  }

  get cook (): boolean {
    return this._cook
  }

  set cook (value: boolean) {
    this._cook = value
  }
}
