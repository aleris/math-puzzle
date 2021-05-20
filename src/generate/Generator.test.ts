import {
  Generator,
  Operator,
  Question,
  QuestionComparator,
} from './Generator'

describe('QuestionComparator', () => {
  test('areEqual returns true for identical questions', () => {
    const a: Question = {
      first: 5,
      operator: Operator.Plus,
      second: 2,
      result: 7
    }
    const b = {...a}
    expect(QuestionComparator.areEqual(a, b)).toStrictEqual(true)
  })

  test('areEqual returns false for questions with different results', () => {
    const a: Question = {
      first: 5,
      operator: Operator.Plus,
      second: 2,
      result: 7
    }
    const b: Question = {
      first: 5,
      operator: Operator.Plus,
      second: 3,
      result: 8
    }
    expect(QuestionComparator.areEqual(a, b)).toStrictEqual(false)
  })

  test('areEqual returns false for questions with different first operand', () => {
    const a: Question = {
      first: 5,
      operator: Operator.Plus,
      second: 2,
      result: 7
    }
    const b: Question = {
      first: 4,
      operator: Operator.Plus,
      second: 3,
      result: 7
    }
    expect(QuestionComparator.areEqual(a, b)).toStrictEqual(false)
  })

  test('areEqual returns false for questions with different second operand', () => {
    const a: Question = {
      first: 5,
      operator: Operator.Plus,
      second: 2,
      result: 7
    }
    const b: Question = {
      first: 5,
      operator: Operator.Plus,
      second: 3,
      result: 8
    }
    expect(QuestionComparator.areEqual(a, b)).toStrictEqual(false)
  })


  test('areEqual returns false for questions with different operator', () => {
    const a: Question = {
      first: 5,
      operator: Operator.Plus,
      second: 2,
      result: 7
    }
    const b: Question = {
      first: 8,
      operator: Operator.Minus,
      second: 1,
      result: 7
    }
    expect(QuestionComparator.areEqual(a, b)).toStrictEqual(false)
  })
})

describe('Generator', () => {
  test('generateQuestions', () => {
    const additionQuestionConfig = {
      enabled: true,
      resultMaxValue: 10,
      allowZero: false,
    }
    const subtractionQuestionConfig = {
      enabled: false,
      resultMaxValue: 10,
      allowZero: false,
    }
    const generator = new Generator({
      locale: 'en',
      numberOfQuestions: 10,
      additionQuestionConfig,
      subtractionQuestionConfig,
      maxTextLength: 4,
      maxResponseImages: 10,
      showUppercase: false,
      showAnswers: false,
    })
    const questions = generator.generateQuestions()
    console.log(questions)
    expect(questions.length).toStrictEqual(10)
    expect(questions.every(r => 1 <= r.result))
      .toStrictEqual(true)
    expect(questions.every(r => r.result <= additionQuestionConfig.resultMaxValue))
      .toStrictEqual(true)
    expect(questions.every(r => 0 < r.first)).toStrictEqual(true)
    expect(questions.every(r => 0 < r.second)).toStrictEqual(true)
    expect(questions.every(r => r.operator === Operator.Plus)).toStrictEqual(true)
  })

  test('generate', () => {
    const additionQuestionConfig = {
      enabled: true,
      resultMaxValue: 10,
      allowZero: false,
    }
    const subtractionQuestionConfig = {
      enabled: false,
      resultMaxValue: 10,
      allowZero: false,
    }
    const generator = new Generator({
      locale: 'en',
      numberOfQuestions: 10,
      additionQuestionConfig,
      subtractionQuestionConfig,
      maxTextLength: 4,
      maxResponseImages: 10,
      showUppercase: false,
      showAnswers: false,
    })
    const workSheet = generator.generate()
    console.log(workSheet)
    expect(Array.from(workSheet.puzzleImageMap.questionIndexToLetterMap.keys())
      .every(i => 0 <= i && i < workSheet.questions.length)
    )
      .toStrictEqual(true)
    expect(Array.from(workSheet.puzzleImageMap.questionIndexToLetterMap.values())
      .every(l => workSheet.puzzleImageMap.image.label.indexOf(l) !== -1)
    )
      .toStrictEqual(true)
    expect(Array.from(workSheet.puzzleImageMap.letterToResultMap.values())
      .every(i => 0 <= i && i < workSheet.questions.length)
    )
      .toStrictEqual(true)
    expect(Array.from(workSheet.puzzleImageMap.letterToResultMap.keys())
      .every(l => workSheet.puzzleImageMap.image.label.indexOf(l) !== -1)
    )
      .toStrictEqual(true)
    expect(workSheet.responseImagesSlice).toHaveLength(10)
  })
})
