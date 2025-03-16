import Match from './Match'
import { SortingMethod, Team } from '../types'
import ByCombinedScore from '../SortingAlgorithms/byCombinedScore'

export default class Scoreboard {
  private matches: Match[] = []
  constructor(
    private sortingMethod: SortingMethod<Match> = new ByCombinedScore()
  ) {}

  startMatch(
    homeTeam: Team,
    awayTeam: Team,
    startTime?: number,
    id?: string
  ): Match {
    if (
      this.matches.some(match => {
        const condition1 = match.homeTeam.id === (homeTeam.id || awayTeam.id)
        const condition2 = match.awayTeam.id === (homeTeam.id || awayTeam.id)
        return condition1 || condition2
      })
    )
      throw new Error('Match with one of these teams already exists')
    const newMatch = new Match(homeTeam, awayTeam, startTime)
    this.matches.push(newMatch)
    return newMatch
  }

  updateScore(matchId: string, homeScore: number, awayScore: number) {
    const match = this.findMatch(matchId)
    match.updateScore(homeScore, awayScore)
  }

  finishMatch(matchId: string) {
    const match = this.findMatch(matchId)
    this.matches = this.matches.filter(item => item.id !== match.id)
  }

  getMatchesSummary() {
    return this.sortingMethod.sort(this.matches)
  }

  getMatches() {
    return this.matches
  }

  private findMatch(matchId: string) {
    const match = this.matches.find(match => match.id === matchId)
    if (!match) throw new Error('Match was not found')
    return match
  }
}
