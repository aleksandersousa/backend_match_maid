import * as jf from 'joiful'

export class Interactions {
  @jf
    .number()
    .required()
  clientId: number

  @jf
    .number()
    .required()
  maidId: number

  @jf
    .date()
    .required()
  accessTime: Date

  constructor (props: Interactions) {
    Object.assign(this, props)
  }
}
