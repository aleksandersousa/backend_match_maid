export class Rating {
  public maidCpf: string
  public stars: string
  public goodWork: boolean
  public onTime: boolean
  public arrivedOnTime: boolean

  constructor (props: Object) {
    Object.assign(this, props)
  }
}
