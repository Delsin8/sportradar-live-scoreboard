import { nanoid } from 'nanoid'
import { Team } from '../types'

export default class Match {
  private homeScore: number
  private awayScore: number

  constructor(
    public readonly homeTeam: Team,
    public readonly awayTeam: Team,
    public readonly startTime: number = Date.now(),
    public readonly id: string = nanoid()
  ) {
    this.homeScore = 0
    this.awayScore = 0
  }

  updateScore(homeScore: number, awayScore: number) {
    if (homeScore < 0 || awayScore < 0) {
      throw new Error('Scores cannot be negative')
    }

    this.homeScore = homeScore
    this.awayScore = awayScore
  }

  getTotalScore() {
    return this.homeScore + this.awayScore
  }

  getScore(): { homeScore: number; awayScore: number } {
    return { homeScore: this.homeScore, awayScore: this.awayScore }
  }
}
