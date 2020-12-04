import { IMaidRepository } from '../../repositories/IMaidRepository'
import { IDeleteMaidRequestDTO } from './DeleteMaidDTO'

export class DeleteMaidUseCase {
  private _maidRepository: IMaidRepository

  constructor (maidRepository: IMaidRepository) {
    this._maidRepository = maidRepository
  }

  async execute (data: IDeleteMaidRequestDTO) {
    const maidExists = await this._maidRepository.findMaidById(data.id)

    if (!maidExists) {
      throw new Error('Maid does not exist.')
    }

    await this._maidRepository.deleteMaid(maidExists.cpf)
  }
}
