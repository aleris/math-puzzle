import './QuestionDisplay.scss'
import React from 'react'
import {DigitsDisplay} from '../DigitDisplay/DigitsDisplay'
import {Question} from '../../generate/Generator'

type Props = {
  question: Question
  showResults: boolean
}

export const QuestionDisplay = ({question, showResults}: Props) => {
  const mappedLetterWithRandomFallback = question.mappedLetter ?? ''
  return (
    <div className="Question">
      <div className="Question--Operand">
        <DigitsDisplay value={question.first} />
      </div>
      <div className="Question--Operator">
        <DigitsDisplay value={question.operator} />
      </div>
      <div className="Question--Operand">
        <DigitsDisplay value={question.second} />
      </div>
      <div className="Question--Operator">
        <DigitsDisplay value="=" />
      </div>
      <div className="Question--Result">
        <DigitsDisplay value={question.result} hiddenOnPrint={true} hidden={!showResults}/>
      </div>
      <div className="Question--MappingArrow">
        ➼
      </div>
      <div className="Question--MappedLetter">
        <DigitsDisplay value={mappedLetterWithRandomFallback}  minLength={1}/>
      </div>
    </div>
  )
}
