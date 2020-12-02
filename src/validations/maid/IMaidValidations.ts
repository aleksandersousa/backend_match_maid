import { Rating } from '../../entities/Rating'
import { DisponibleDays } from '../../entities/DisponibleDays'
import { DisponiblePeriod } from '../../entities/DisponiblePeriod'
import { Maid } from '../../entities/Maid'
import { MaidLocation } from '../../entities/MaidLocation'
import { Services } from '../../entities/Services'

export interface IMaidValidations {
  checkMaidError(maid: Maid): void
  checkMaidLocationError(maidLocation: MaidLocation): void
  checkMaidDisponibleDaysError(disponibleDays: DisponibleDays): void
  checkMaidDisponiblePeriodError(disponiblePeriod: DisponiblePeriod): void
  checkMaidServicesError(services: Services): void
  checkMaidRatingError(rating: Rating): void
}
