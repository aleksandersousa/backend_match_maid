import { Client } from '../../entities/Client'
import { ClientLocation } from '../../entities/ClientLocation'

export interface IClientValidations {
  checkClientError(client: Client): void
  checkClientLocationError(clientLocation: ClientLocation): void
}
