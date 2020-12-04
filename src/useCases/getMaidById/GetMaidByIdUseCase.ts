import { IMaidRepository } from '../../repositories/IMaidRepository'
import { IFindMaidByIdRequestDTO } from './GetMaidByIdDTO'

export class FindMaidByIdUseCase {
  private _maidRepository: IMaidRepository

  constructor (maidRepository: IMaidRepository) {
    this._maidRepository = maidRepository
  }

  async execute (data: IFindMaidByIdRequestDTO) {
    const results = await this._maidRepository.getMaid(data.id)

    if (!results) {
      throw new Error('Maid doest not exist.')
    }

    return results
  }
}
