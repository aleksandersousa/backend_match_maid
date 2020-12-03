import * as jf from 'joiful'
export class MaidLocation {
  @jf
    .string()
    .max(15)
    .required()
  public maidCpf: string

  @jf.number().required()
  public latitude: number

  @jf.number().required()
  public longitude: number

  @jf
    .string()
    .min(1)
    .max(150)
    .required()
  public street: string

  @jf
    .string()
    .min(1)
    .max(20)
    .required()
  public houseNumber: string

  @jf
    .string()
    .min(1)
    .max(50)
    .required()
  public neighborhood: string

  @jf
    .string()
    .required()
  public complement: string

  @jf
    .string()
    .min(1)
    .max(50)
    .required()
  public city: string

  @jf
    .string()
    .min(8)
    .max(10)
    .required()
  public cep: string

  @jf
    .string()
    .min(2)
    .max(2)
    .required()
  public uf: string

  constructor (props: MaidLocation) {
    Object.assign(this, props)
  }
}
