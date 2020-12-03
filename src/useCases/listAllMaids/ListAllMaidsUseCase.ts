import { IMaidRepository } from '../../repositories/IMaidRepository'

export class ListAllMaidsUseCase {
  private _maidRepository: IMaidRepository

  constructor (maidRepository: IMaidRepository) {
    this._maidRepository = maidRepository
  }

  async execute (): Promise<[Object]> {
    return await this._maidRepository.getAllMaids()
  }
}
