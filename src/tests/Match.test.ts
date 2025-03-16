import { Match } from '../models'
import { teams } from '../data'

jest.mock('nanoid', () => {
  let counter = 1
  return {
    nanoid: jest.fn(() => `mocked_id_${counter++}`),
  }
})

describe('Match', () => {
  test('should start with 0-0 score', () => {
    const match = new Match(teams[0], teams[1])
    expect(match.getTotalScore()).toBe(0)
  })

  test('should update the score correctly', () => {
    const match = new Match(teams[0], teams[1])
    match.updateScore(2, 3)
    expect(match.getTotalScore()).toBe(5)
  })

  test('should throw an error for negative scores', () => {
    const match = new Match(teams[0], teams[1])
    expect(() => match.updateScore(-1, 2)).toThrow('Scores cannot be negative')
  })
})
