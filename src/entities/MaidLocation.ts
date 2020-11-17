export class MaidLocation {
  public maidCpf: string
  public latitude: number
  public longitude: number
  public street: string
  public houseNumber: string
  public neighborhood: string
  public city: string
  public cep: string
  public uf: string

  constructor (props: Object) {
    Object.assign(this, props)
  }
}
