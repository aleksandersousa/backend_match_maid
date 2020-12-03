export interface IMaidLocation {
  maidCpf: string
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

export interface IMaidDisponibleDays {
  maidCpf: string
  monday: boolean
  tuesday: boolean
  wednesday: boolean
  thursday: boolean
  friday: boolean
  saturday: boolean
  sunday: boolean
}

export interface IMaidDisponiblePeriod {
  maidCpf: string
  mornig: boolean
  afternoon: boolean
  night: boolean
}

export interface IMaidServices {
  maidCpf: string
  nanny: boolean
  careHouse: boolean
  cleanHouse: boolean
  ironClothes: boolean
  washClothes: boolean
  washDishes: boolean
  cook: boolean
}

export interface ICreateMaidRequestDTO {
  cpf: string
  name: string
  email: string
  password: string
  phoneNumber: string
  birthDate: Date
  status: boolean
  bibliography: string
  pricePerHour: number
  numberOfVisits: number
  image: string
}
