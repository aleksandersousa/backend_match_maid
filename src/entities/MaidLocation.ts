export class MaidLocation {
  public maidCpf: string
  public longitude: number
  public latitude: number
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
