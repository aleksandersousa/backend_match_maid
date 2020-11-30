import { Maid } from '../../entities/Maid'
import { IMaidRepository } from '../../repositories/IMaidRepository'
import { MaidValidations } from '../../validations/maid/MaidValidations'
import { IUpdateMaidRequestDTO } from './UpdateMaidDTO'

export class UpdateMaidUseCase {
  private _maidRepository: IMaidRepository

  constructor (maidRepository: IMaidRepository) {
    this._maidRepository = maidRepository
  }

  async execute (data: IUpdateMaidRequestDTO, cpf: string) {
    const maidAlreadyExists = await this._maidRepository.findMaidByEmail(data.email)

    if (!maidAlreadyExists) {
      throw new Error('Maid does not exist.')
    }

    const maid = new Maid(data)
    const maidValidations = new MaidValidations()

    const error = maidValidations.checkMaidError(maid)

    if (error) {
      throw new Error(error.message)
    }

    await this._maidRepository.updateMaid(maid)
  }
}
