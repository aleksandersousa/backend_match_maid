import { Interactions } from '../../entities/Interactions'
import { InteractionsValidations } from './InteractionsValidations'

describe('Testing maid validations', () => {
  let interaction: Interactions
  let interactionsValidations: InteractionsValidations

  beforeAll(() => {
    const data = {
      clientId: 1,
      maidId: 1,
      accessTime: '1999-06-26 18:25:43'
    }

    interaction = new Interactions(data as unknown as Interactions)
    interactionsValidations = new InteractionsValidations()
  })

  it('should detect error in interactions attributes', () => {
    const error = interactionsValidations.checkInteractionError(interaction)

    expect(error || false).toBe(false)
  })
})
