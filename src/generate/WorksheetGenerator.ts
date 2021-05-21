import {PuzzleImageMap, PuzzleImageMapper} from './PuzzleImageMapper'
import {
  AdditionQuestionConfig,
  AdditionQuestionGenerator, Question,
  QuestionGenerator,
  SubtractionQuestionConfig,
  SubtractionQuestionGenerator
} from './QuestionGenerator'
import {Random} from './Random'
import {ImageItem, Texts} from '../Texts'

export type WorksheetConfig = {
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

export type WorkSheet = {
  questions: Question[]
  puzzleImageMap: PuzzleImageMap
  responseImagesSlice: ImageItem[]
  config: WorksheetConfig
  difficulty: number
}

export class WorksheetGenerator {
  private readonly questionGenerators: QuestionGenerator[]

  constructor(public readonly config: WorksheetConfig) {
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
    const puzzleImageMap = PuzzleImageMapper.map(questions, puzzleImage)
    Array
      .from(puzzleImageMap.questionIndexToLetterMap.entries())
      .forEach(([questionIndex, letter]) => questions[questionIndex].mappedLetter = letter)
    questions.forEach(question => {
      if (question.mappedLetter === undefined) {
        question.mappedLetter = Random.letterExcept(puzzleImage.label)
        if (this.config.showUppercase) {
          question.mappedLetter = question.mappedLetter.toUpperCase()
        }
      }
    })
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
