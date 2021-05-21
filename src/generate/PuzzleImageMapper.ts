import {ImageItem} from '../Texts'
import {Question} from './QuestionGenerator'
import {Random} from './Random'

export type PuzzleImageMap = {
  image: ImageItem
  questionIndexToLetterMap: Map<number, string>
  letterToResultMap: Map<string, number>
}

export class PuzzleImageMapper {
  static map(questions: Question[], image: ImageItem): PuzzleImageMap {
    const puzzleWord = image.label
    const questionIndexToLetterMap = new Map<number, string>()
    const letterToResultMap = new Map<string, number>()
    const allQuestionIndexes = Array.from({length: questions.length}).map((_, index) => index)
    const remainingIndexes = allQuestionIndexes
    for (const letter of puzzleWord) {
      let indexesToPickFrom = remainingIndexes
      if (indexesToPickFrom.length === 0) {
        indexesToPickFrom = allQuestionIndexes
      }
      const indexIndex = Random.interval(0, indexesToPickFrom.length - 1)
      const randomIndex = indexesToPickFrom[indexIndex]
      questionIndexToLetterMap.set(randomIndex, letter)
      letterToResultMap.set(letter, questions[randomIndex].result)
      remainingIndexes.splice(indexIndex, 1)
    }
    return {
      image,
      questionIndexToLetterMap,
      letterToResultMap,
    }
  }
}
