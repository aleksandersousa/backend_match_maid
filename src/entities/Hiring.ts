import { uuid } from 'uuidv4'

export class Hiring {
  public readonly id: string

  public maidCpf: string
  public clientCpf: string
  public dateTimeStart: Date
  public dateTimeEnd: Date

  constructor (props: Omit<Hiring, 'id'>, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = uuid()
    }
  }
}
