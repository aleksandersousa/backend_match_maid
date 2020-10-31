export class ClientLocation {
  private _clientCpf: string
  private _longitude: number
  private _latitude: number
  private _street: string
  private _houseNumber: string
  private _neighborhood: string
  private _city: string
  private _cep: string
  private _uf: string

  constructor (props: Object) {
    Object.assign(this, props)
  }

  get clientcpf (): string {
    return this._clientCpf
  }

  get longitude (): number {
    return this._longitude
  }

  set longitude (value: number) {
    this._longitude = value
  }

  get latitude (): number {
    return this._latitude
  }

  set latitude (value: number) {
    this._latitude = value
  }

  get street (): string {
    return this._street
  }

  set street (value: string) {
    this._street = value
  }

  get houseNumber (): string {
    return this._houseNumber
  }

  set houseNumber (value: string) {
    this._houseNumber = value
  }

  get neighborhood (): string {
    return this._neighborhood
  }

  set neighborhood (value: string) {
    this._neighborhood = value
  }

  get city (): string {
    return this._city
  }

  set city (value: string) {
    this._city = value
  }

  get cep (): string {
    return this._cep
  }

  set cep (value: string) {
    this._cep = value
  }

  get uf (): string {
    return this._uf
  }

  set uf (value: string) {
    this._uf = value
  }
}
