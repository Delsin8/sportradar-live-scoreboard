import Scoreboard from '../models/Scoreboard'
import ByCombinedScore from '../SortingAlgorithms/byCombinedScore'
import { teams } from '../data'

describe('Scoreboard', () => {
  let scoreboard: Scoreboard

  beforeEach(() => {
    scoreboard = new Scoreboard(new ByCombinedScore())
  })

  test('should add match to the scoreboard', () => {
    scoreboard.startMatch(teams[0], teams[1])
    expect(scoreboard.getMatches()).toHaveLength(1)
  })

  test('should throw error if match with one of the selected teams is ongoing', () => {
    scoreboard.startMatch(teams[0], teams[1])
    expect(() => scoreboard.startMatch(teams[0], teams[2])).toThrow(
      'Match with one of these teams already exists'
    )
  })

  test('should uptate the score of an ongoing match', () => {
    const match = scoreboard.startMatch(teams[0], teams[1])
    scoreboard.updateScore(match.id, 7, 1)
    expect(scoreboard.getMatchesSummary()[0].getTotalScore()).toBe(8)
  })

  test('should finish an ongoing match', () => {
    const match = scoreboard.startMatch(teams[0], teams[1])
    scoreboard.finishMatch(match.id)
    expect(scoreboard.getMatches()).toHaveLength(0)
  })

  test('should order matches by their overall score, if even - by start date', () => {
    const match1 = scoreboard.startMatch(teams[0], teams[1], Date.now())
    const match2 = scoreboard.startMatch(teams[2], teams[3], Date.now() + 100)
    const match3 = scoreboard.startMatch(teams[4], teams[5], Date.now())
    const match4 = scoreboard.startMatch(teams[6], teams[7], Date.now() - 100)

    match1.updateScore(1, 3)
    match2.updateScore(2, 2)
    match3.updateScore(5, 2)
    match4.updateScore(4, 0)

    const expectedMatchesOrder = [match3, match4, match1, match2]

    expect(scoreboard.getMatchesSummary()).toMatchObject(expectedMatchesOrder)
  })
})
