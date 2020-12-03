import * as jf from 'joiful'

export class Services {
  @jf
    .string()
    .max(15)
    .required()
  public maidCpf: string

  @jf.boolean().required()
  public nanny: boolean

  @jf.boolean().required()
  public careHouse: boolean

  @jf.boolean().required()
  public cleanHouse: boolean

  @jf.boolean().required()
  public ironClothes: boolean

  @jf.boolean().required()
  public washClothes: boolean

  @jf.boolean().required()
  public washDishes: boolean

  @jf.boolean().required()
  public cook: boolean

  constructor (props: Services) {
    Object.assign(this, props)
  }
}
