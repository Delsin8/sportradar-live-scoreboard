import Match from '../models/Match'
import { SortingMethod } from '../types'

export default class ByCombinedScore implements SortingMethod<Match> {
  sort(matches: Match[]) {
    return [...matches].sort((a, b) => {
      const score1 = a.getTotalScore()
      const score2 = b.getTotalScore()
      if (score1 === score2) return a.startTime - b.startTime
      return score2 - score1
    })
  }
}
