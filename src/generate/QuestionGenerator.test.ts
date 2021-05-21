import {
  AdditionQuestionConfig,
  AdditionQuestionGenerator,
  Operator, SubtractionQuestionConfig,
  SubtractionQuestionGenerator
} from './QuestionGenerator'

describe('QuestionGenerator', () => {
  describe('AdditionQuestionGenerator', () => {
    test('generate within result max value and without zero', () => {
      const config: AdditionQuestionConfig = {
        enabled: true,
        resultMaxValue: 3,
        allowZero: false,
      }
      const generator = new AdditionQuestionGenerator(config)
      for (let i = 0; i !== 100; i++) {
        const question = generator.generate()
        expect(question.first + question.second).toStrictEqual(question.result)
        expect(question.operator).toStrictEqual(Operator.PLUS)
        expect(question.result).toBeGreaterThan(0)
        expect(question.result).toBeLessThanOrEqual(3)
      }
    })

    test('generate within result max value but with zero', () => {
      const config: AdditionQuestionConfig = {
        enabled: true,
        resultMaxValue: 3,
        allowZero: true,
      }
      const generator = new AdditionQuestionGenerator(config)
      for (let i = 0; i !== 100; i++) {
        const question = generator.generate()
        expect(question.first + question.second).toStrictEqual(question.result)
        expect(question.operator).toStrictEqual(Operator.PLUS)
        expect(question.result).toBeGreaterThanOrEqual(0)
        expect(question.result).toBeLessThanOrEqual(3)
      }
    })
  })

  describe('SubtractionQuestionGenerator', () => {
    test('generate within result max value and without zero', () => {
      const config: SubtractionQuestionConfig = {
        enabled: true,
        resultMaxValue: 3,
        allowZero: false,
      }
      const generator = new SubtractionQuestionGenerator(config)
      for (let i = 0; i !== 100; i++) {
        const question = generator.generate()
        expect(question.first - question.second).toStrictEqual(question.result)
        expect(question.operator).toStrictEqual(Operator.MINUS)
        expect(question.result).toBeGreaterThan(0)
        expect(question.result).toBeLessThanOrEqual(3)
      }
    })

    test('generate within result max value but with zero', () => {
      const config: SubtractionQuestionConfig = {
        enabled: true,
        resultMaxValue: 3,
        allowZero: true,
      }
      const generator = new SubtractionQuestionGenerator(config)
      for (let i = 0; i !== 100; i++) {
        const question = generator.generate()
        expect(question.first - question.second).toStrictEqual(question.result)
        expect(question.operator).toStrictEqual(Operator.MINUS)
        expect(question.result).toBeGreaterThanOrEqual(0)
        expect(question.result).toBeLessThanOrEqual(3)
      }
    })
  })
})
