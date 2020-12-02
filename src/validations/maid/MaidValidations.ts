import * as jf from 'joiful'
import { Rating } from '../../entities/Rating'
import { DisponibleDays } from '../../entities/DisponibleDays'
import { DisponiblePeriod } from '../../entities/DisponiblePeriod'
import { Maid } from '../../entities/Maid'
import { MaidLocation } from '../../entities/MaidLocation'
import { Services } from '../../entities/Services'
import { IMaidValidations } from './IMaidValidations'

export class MaidValidations implements IMaidValidations {
  checkMaidError (maid: Maid) {
    const { error } = jf.validate(maid)
    return error
  }

  checkMaidLocationError (maidLocation: MaidLocation) {
    const { error } = jf.validate(maidLocation)
    return error
  }

  checkMaidDisponibleDaysError (disponibleDays: DisponibleDays) {
    const { error } = jf.validate(disponibleDays)
    return error
  }

  checkMaidDisponiblePeriodError (disponiblePeriod: DisponiblePeriod) {
    const { error } = jf.validate(disponiblePeriod)
    return error
  }

  checkMaidServicesError (services: Services) {
    const { error } = jf.validate(services)
    return error
  }

  checkMaidRatingError (rating: Rating) {
    const { error } = jf.validate(rating)
    return error
  }
}
