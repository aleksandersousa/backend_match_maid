import { ClientLocation } from '../../entities/ClientLocation'
import { Client } from '../../entities/Client'
import { ClientValidations } from './ClientValidations'

describe('testing client validations', () => {
  let client: Client
  let clientValidations: ClientValidations
  let clientLocation: ClientLocation

  beforeAll(() => {
    const data = {
      cpf: '000.000.000-00',
      name: 'Test User',
      email: 'email@test.com',
      password: '12345678',
      phoneNumber: '00000000000000',
      birthDate: '1999-06-26 18:25:43',
      image: 'image'
    }

    const location = {
      clientCpf: '000.000.000-00',
      latitude: -14.525221,
      longitude: -40.363233,
      street: 'Street Test',
      houseNumber: '00',
      complement: 'test',
      neighborhood: 'Test',
      city: 'TestCity',
      cep: '00000-000',
      uf: 'TS'
    }

    client = new Client(data as unknown as Client)
    clientLocation = new ClientLocation(location as unknown as ClientLocation)
    clientValidations = new ClientValidations()
  })

  it('should detect error in client attributes', () => {
    const error = clientValidations.checkClientError(client)

    expect(error || false).toBe(false)
  })

  it('should check if has error on clientLocation attributes', () => {
    const error = clientValidations.checkClientLocationError(clientLocation)

    expect(error || false).toBe(false)
  })
})
