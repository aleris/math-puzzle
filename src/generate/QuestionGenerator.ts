import {Random} from './Random'

export enum Operator {
  PLUS = '+',
  MINUS = '-'
}

export type Question = {
  first: number,
  operator: Operator
  second: number,
  result: number
  mappedLetter?: string | undefined
}

export interface QuestionGenerator {
  generate(): Question
}

export interface QuestionGeneratorConfigType {
  enabled: boolean
}

export interface AdditionQuestionConfig extends QuestionGeneratorConfigType {
  resultMaxValue: number,
  allowZero: boolean
}

export class AdditionQuestionGenerator implements QuestionGenerator {
  constructor(public readonly config: AdditionQuestionConfig) { }

  generate(): Question {
    const allowZero = this.config.allowZero
    const resultInterval = [allowZero ? 1 : 2, this.config.resultMaxValue]
    const result = Random.interval(resultInterval[0], resultInterval[1])
    const first = Random.interval(allowZero ? 0 : 1, result - (allowZero ? 0 : 1))
    const second = result - first
    return {
      first,
      operator: Operator.PLUS,
      second,
      result
    }
  }
}

export interface SubtractionQuestionConfig extends QuestionGeneratorConfigType {
  resultMaxValue: number,
  allowZero: boolean
}

export class SubtractionQuestionGenerator implements QuestionGenerator {
  constructor(public readonly config: SubtractionQuestionConfig) { }

  generate(): Question {
    const allowZero = this.config.allowZero
    const first = Random.interval(allowZero ? 0 : 2, this.config.resultMaxValue)
    const result = Random.interval(allowZero ? 0 : 1, first - (allowZero ? 0 : 1))
    const second = first - result
    return {
      first,
      operator: Operator.MINUS,
      second,
      result
    }
  }
}