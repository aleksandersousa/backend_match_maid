export interface IClientLocation {
  clientCpf: string
  latitude: number
  longitude: number
  street: string
  houseNumber: string
  complement: string
  neighborhood: string
  city: string
  cep: string
  uf: string
}
export interface ICreateClientRequestDTO {
  cpf: string
  name: string
  email: string
  password: string
  phoneNumber: string
  birthDate: Date
  image: string
}
