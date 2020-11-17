import { MaidLocation } from '../../entities/MaidLocation'

export class ICreateUserMaidRequestDTO {
  cpf: string
  name: string
  email: string
  password: string
  phoneNumber: string
  birthDate: Date
  status: boolean
  location: MaidLocation
}
