export class Services {
  public maidCpf: string
  public nanny: boolean
  public careHouse: boolean
  public cleanHouse: boolean
  public ironClothes: boolean
  public washClothes: boolean
  public washDishes: boolean
  public cook: boolean

  constructor (props: Object) {
    Object.assign(this, props)
  }
}
