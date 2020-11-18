import { ClientLocation } from '../../entities/ClientLocation'

export interface ICreateClientRequestDTO {
  cpf: string
  name: string
  email: string
  password: string
  phoneNumber: string
  birthDate: Date
  location: ClientLocation
}
