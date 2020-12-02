import { MaidValidations } from '../../validations/maid/MaidValidations'
import { Rating } from '../../entities/Rating'
import { IMaidRepository } from '../../repositories/IMaidRepository'

export class RateMaidUseCase {
  private _maidRepository: IMaidRepository

  constructor (maidRepository: IMaidRepository) {
    this._maidRepository = maidRepository
  }

  async execute (data: Rating) {
    const rating = new Rating(data)
    const maidValidations = new MaidValidations()

    const error = maidValidations.checkMaidRatingError(rating)

    if (error) {
      throw new Error(error.message)
    }

    await this._maidRepository.updateMaidRating(rating)
  }
}
