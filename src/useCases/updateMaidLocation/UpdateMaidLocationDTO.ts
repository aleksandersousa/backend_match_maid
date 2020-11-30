export interface UpdateMaidLocationRequestDTO {
  maidCpf: string,
  latitude: number,
  longitude: number,
  street: string,
  houseNumber: string,
  neighborhood: string,
  city: string,
  cep: string,
  uf: string
}
