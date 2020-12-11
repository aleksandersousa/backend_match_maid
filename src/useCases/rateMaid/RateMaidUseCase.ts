import { MaidValidations } from '../../validations/maid/MaidValidations'
import { Rating } from '../../entities/Rating'
import { IMaidRepository } from '../../repositories/IMaidRepository'
import { IRateMaidResquestDTO } from './RateMaidDTO'

export class RateMaidUseCase {
  private _maidRepository: IMaidRepository

  constructor (maidRepository: IMaidRepository) {
    this._maidRepository = maidRepository
  }

  async execute (data: IRateMaidResquestDTO, id: number) {
    const maidAlreadyExists = await this._maidRepository.findMaidById(id)

    if (!maidAlreadyExists) {
      throw new Error('Maid does not exist.')
    }

    const rating = new Rating({
      maidCpf: maidAlreadyExists.cpf,
      clientId: data.clientId,
      clientName: data.clientName,
      stars: data.stars,
      goodWork: data.goodWork,
      onTime: data.onTime,
      arrivedOnTime: data.arrivedOnTime
    })

    const maidValidations = new MaidValidations()

    const error = maidValidations.checkMaidRatingError(rating)

    if (error) {
      throw new Error(error.message)
    }

    await this._maidRepository.createMaidRating(rating)
  }
}
