import * as jf from 'joiful'
import { Client } from '../../entities/Client'
import { ClientLocation } from '../../entities/ClientLocation'
import { IClientValidations } from './IClientValitions'

export class ClientValidations implements IClientValidations {
  checkClientError (client: Client) {
    const { error } = jf.validate(client)
    return error
  }

  checkClientLocationError (clientLocation: ClientLocation) {
    const { error } = jf.validate(clientLocation)
    return error
  }
}
