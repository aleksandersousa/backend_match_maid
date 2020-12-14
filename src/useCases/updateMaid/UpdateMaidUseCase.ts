import { Maid } from '../../entities/Maid'
import { IMaidRepository } from '../../repositories/IMaidRepository'
import { MaidValidations } from '../../validations/maid/MaidValidations'
import { IUpdateMaidRequestDTO } from './UpdateMaidDTO'

export class UpdateMaidUseCase {
  private _maidRepository: IMaidRepository

  constructor (maidRepository: IMaidRepository) {
    this._maidRepository = maidRepository
  }

  async execute (data: IUpdateMaidRequestDTO, id: number) {
    const maidAlreadyExists = await this._maidRepository.findMaidById(id)

    if (!maidAlreadyExists) {
      throw new Error('Maid does not exist.')
    } else if (maidAlreadyExists.cpf !== data.cpf) {
      throw new Error('Invalid cpf.')
    }

    const maid = new Maid(data)
    const maidValidations = new MaidValidations()

    const error = maidValidations.checkMaidError(maid)

    if (error) {
      throw new Error(error.message)
    }

    await this._maidRepository.updateMaid(maid, id)
  }
}
