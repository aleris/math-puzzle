import {WorkSheet, WorksheetGenerator} from './WorksheetGenerator'

describe('WorksheetGenerator', () => {
  test('generateQuestions', () => {
    const additionQuestionConfig = {
      enabled: true,
      resultMaxValue: 10,
      allowZero: false,
    }
    const subtractionQuestionConfig = {
      enabled: true,
      resultMaxValue: 10,
      allowZero: false,
    }
    const generator = new WorksheetGenerator({
      locale: 'en',
      numberOfQuestions: 8,
      additionQuestionConfig,
      subtractionQuestionConfig,
      maxTextLength: 4,
      maxResponseImages: 10,
      showUppercase: false,
      showAnswers: false,
    })

    function expectQuestionsResultsAreUnique(workSheet: WorkSheet) {
      expect(new Set(workSheet.questions.map(q => q.result)).size).toStrictEqual(workSheet.questions.length)
    }

    function expectQuestionIndexInMapAreInQuestionsArray(workSheet: WorkSheet) {
      expect(Array.from(workSheet.puzzleImageMap.questionIndexToLetterMap.keys())
        .every(i => 0 <= i && i < workSheet.questions.length)
      )
        .toStrictEqual(true)
    }

    function expectLetterFromMapAreFromPuzzleImageLabel(workSheet: WorkSheet) {
      expect(Array.from(workSheet.puzzleImageMap.questionIndexToLetterMap.values())
        .every(l => workSheet.puzzleImageMap.image.label.indexOf(l) !== -1)
      )
        .toStrictEqual(true)
    }

    function expectResultInMapToBeFromQuestions(workSheet: WorkSheet) {
      expect(Array.from(workSheet.puzzleImageMap.letterToResultMap.values())
        .every(result => workSheet.questions.map(q => q.result).find(r => r === result) !== undefined)
      )
        .toStrictEqual(true)
    }

    function expectLetterFromMapToBeFromPuzleImageMap(workSheet: WorkSheet) {
      expect(Array.from(workSheet.puzzleImageMap.letterToResultMap.keys())
        .every(l => workSheet.puzzleImageMap.image.label.indexOf(l) !== -1)
      )
        .toStrictEqual(true)
    }

    for (let i = 0; i !== 100; i++) {
      const workSheet = generator.generate()
      // console.log(workSheet)

      expect(workSheet.questions).toHaveLength(8)

      expectQuestionsResultsAreUnique(workSheet)

      expectQuestionIndexInMapAreInQuestionsArray(workSheet)

      expectLetterFromMapAreFromPuzzleImageLabel(workSheet)

      expectResultInMapToBeFromQuestions(workSheet)

      expectLetterFromMapToBeFromPuzleImageMap(workSheet)

      expect(workSheet.responseImagesSlice).toHaveLength(10)
    }
  })
})
