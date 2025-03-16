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
    this.validateMatchStart(homeTeam, awayTeam)

    const newMatch = new Match(homeTeam, awayTeam, startTime, id)
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

  private validateMatchStart(homeTeam: Team, awayTeam: Team) {
    if (this.isTeamAlreadyInMatch(homeTeam, awayTeam)) {
      throw new Error('Match with one of these teams already exists')
    }
    if (this.isSameTeamsInMatch(homeTeam, awayTeam)) {
      throw new Error('Home and away teams should be unique')
    }
  }

  private isTeamAlreadyInMatch(homeTeam: Team, awayTeam: Team) {
    return this.matches.some(
      match =>
        [match.homeTeam.id, match.awayTeam.id].includes(homeTeam.id) ||
        [match.homeTeam.id, match.awayTeam.id].includes(awayTeam.id)
    )
  }

  private isSameTeamsInMatch(homeTeam: Team, awayTeam: Team) {
    return homeTeam.id === awayTeam.id
  }

  private findMatch(matchId: string) {
    const match = this.matches.find(match => match.id === matchId)
    if (!match) throw new Error('Match was not found')
    return match
  }
}
