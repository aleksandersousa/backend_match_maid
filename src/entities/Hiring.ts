import { uuid } from 'uuidv4'

export class Hiring {
  private readonly _id: string

  private _maidCpf: string
  private _clientCpf: string
  private _dateTimeStart: Date
  private _dateTimeEnd: Date

  constructor (props: Omit<Hiring, 'id'>, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this._id = uuid()
    }
  }

  get id (): string {
    return this._id
  }

  get maidCpf (): string {
    return this._maidCpf
  }

  set maidCpf (value: string) {
    this._maidCpf = value
  }

  get clientCpf (): string {
    return this._clientCpf
  }

  set clientCpf (value: string) {
    this._clientCpf = value
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
