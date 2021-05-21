import {ImageItem} from '../Texts'
import {PuzzleImageMapper} from './PuzzleImageMapper'
import {Operator, Question} from './QuestionGenerator'

describe('PuzzleImageMapper', () => {
  test('', () => {
    const questions: Question[] = [
      {first: 1, second: 2, result: 3, operator: Operator.PLUS},
      {first: 3, second: 1, result: 2, operator: Operator.MINUS}
    ]
    const puzzleImage: ImageItem = {
      name: 'ab',
      label: 'Ab'
    }

    const map = PuzzleImageMapper.map(questions, puzzleImage)

    expect(map.image).toStrictEqual(puzzleImage)
    expect(map.letterToResultMap.size).toStrictEqual(2)
    expect(Array.from(map.letterToResultMap.keys()).sort()).toStrictEqual(['A', 'b'])
    expect(Array.from(map.letterToResultMap.values()).sort()).toStrictEqual([2, 3])
    expect(map.questionIndexToLetterMap.size).toStrictEqual(2)
    expect(Array.from(map.questionIndexToLetterMap.keys()).sort()).toStrictEqual([0, 1])
    expect(Array.from(map.questionIndexToLetterMap.values()).sort()).toStrictEqual(['A', 'b'])
  })
})
