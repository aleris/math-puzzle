import {Random} from './Random'
import {ImageItem, Texts} from '../Texts'

export interface QuestionGeneratorConfigType {
  enabled: boolean
}

export type Config = {
  locale: string
  numberOfQuestions: number
  additionQuestionConfig: AdditionQuestionConfig
  subtractionQuestionConfig: SubtractionQuestionConfig
  maxTextLength: number
  maxResponseImages: number
  showUppercase: boolean
  showAnswers: boolean
}

export const MAXIMUM_RESULT_VALUE_LIST = [10, 15, 20, 30, 50, 100]
export const MAXIMUM_TEXT_LENGTH_LIST = [4, 5, 6, 7, 8, 1001]

export enum Operator {
  Plus = '+',
  Minus = '-'
}

export type Question = {
  first: number,
  operator: Operator
  second: number,
  result: number
  mappedLetter?: string | undefined
}

export class QuestionComparator {
  static areEqual(a: Question, b: Question) {
    if (a.result !== b.result) {
      return false
    }
    if (a.first !== b.first) {
      return false
    }
    if (a.operator !== b.operator) {
      return false
    }
    if (a.second !== b.second) {
      return false
    }
    return true
  }
}

export interface QuestionGenerator {
  generate(): Question
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
      operator: Operator.Plus,
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
    const first = Random.interval(allowZero ? 0 : 1, this.config.resultMaxValue)
    const result = Random.interval(allowZero? 0 : 1, first - (allowZero ? 0 : 1))
    const second = first - result
    return {
      first,
      operator: Operator.Minus,
      second,
      result
    }
  }
}

export type PuzzleImageMap = {
  image: ImageItem
  questionIndexToLetterMap: Map<number, string>
  letterToResultMap: Map<string, number>
}

export type WorkSheet = {
  questions: Question[]
  puzzleImageMap: PuzzleImageMap
  responseImagesSlice: ImageItem[]
  config: Config
  difficulty: number
}

export class Generator {
  private readonly questionGenerators: QuestionGenerator[]

  constructor(public readonly config: Config) {
    this.questionGenerators = []
    if (config.additionQuestionConfig.enabled) {
      this.questionGenerators.push(new AdditionQuestionGenerator(config.additionQuestionConfig))
    }
    if (config.subtractionQuestionConfig.enabled) {
      this.questionGenerators.push(new SubtractionQuestionGenerator(config.subtractionQuestionConfig))
    }

    if (this.questionGenerators.length === 0) {
      this.questionGenerators.push(new AdditionQuestionGenerator(config.additionQuestionConfig))
    }
  }

  generate(): WorkSheet {
    const allImages = Texts.allImages()
    let images = allImages.filter(image => image.label.length <= this.config.maxTextLength)
    if (images.length === 0) {
      console.warn(`Cannot find word with maxim length ${this.config.maxTextLength}, falling back to all words`)
      images = allImages
    }
    const randomImageIndex = Random.interval(0, images.length - 1)
    const randomImage = images[randomImageIndex]
    const puzzleImage = {
      ...randomImage,
      label: this.config.showUppercase ? randomImage.label.toUpperCase() : randomImage.label
    }
    const questions = this.generateQuestions()
    const {questionIndexToLetterMap, letterToResultMap} = this.generateMaps(questions, puzzleImage.label)
    Array
      .from(questionIndexToLetterMap.entries())
      .forEach(([questionIndex, letter]) => questions[questionIndex].mappedLetter = letter)
    questions.forEach(question => {
      if (question.mappedLetter === undefined) {
        question.mappedLetter = Random.letterExcept(puzzleImage.label)
        if (this.config.showUppercase) {
          question.mappedLetter = question.mappedLetter.toUpperCase()
        }
      }
    })
    const puzzleImageMap = {
      image: puzzleImage,
      questionIndexToLetterMap,
      letterToResultMap,
    }
    const imagesWithoutPickedPuzzleImage = images.filter(image => image.label !== randomImage.label)
    const responseImagesSlice = Random.slice(imagesWithoutPickedPuzzleImage, this.config.maxResponseImages, puzzleImage)
      .map(image => ({
        ...image,
        label: this.config.showUppercase ? image.label.toUpperCase() : image.label
      }))
    return {
      questions,
      puzzleImageMap,
      responseImagesSlice,
      config: this.config,
      difficulty: this.calculateDifficulty()
    }
  }

  private generateMaps(questions: Question[], puzzleWord: string) {
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
    return {questionIndexToLetterMap, letterToResultMap}
  }

  generateQuestions(): Array<Question> {
    const list: Question[] = []
    let tryCount = 100
    do {
      tryCount--
      const questionGenerator = this.pickRandomQuestionGenerator()
      const q = questionGenerator.generate()
      const isSameResult = list.some(lq => lq.result === q.result)
      if (isSameResult && 0 < tryCount) {
        continue
      }
      list.push(q)
    } while (list.length !== this.config.numberOfQuestions)
    return list
  }

  private pickRandomQuestionGenerator() {
    const randomIndex = Random.interval(0, this.questionGenerators.length - 1)
    return this.questionGenerators[randomIndex]
  }

  private calculateDifficulty() {
    let raw = 1

    if (!this.config.showUppercase) {
      raw += 0.5
    }

    if (this.config.subtractionQuestionConfig.enabled) {
      raw += 1
    }

    MAXIMUM_TEXT_LENGTH_LIST.forEach(v => {
      if (v < this.config.maxTextLength) {
        raw += 0.25
      }
    })

    MAXIMUM_RESULT_VALUE_LIST.forEach(v => {
      if (v < this.config.additionQuestionConfig.resultMaxValue ||
        v < this.config.subtractionQuestionConfig.resultMaxValue) {
        raw += 0.5
      }
    })

    return Math.min(5, raw)
  }
}
