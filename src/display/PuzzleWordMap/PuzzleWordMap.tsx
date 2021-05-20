import './PuzzleWordMap.scss'
import React from 'react'
import {DigitsDisplay} from '../DigitDisplay/DigitsDisplay'
import {PuzzleImageMap} from '../../generate/Generator'

type Props = {
  puzzleImageMap: PuzzleImageMap
  showResults: boolean
}

export const PuzzleWordMap = ({puzzleImageMap, showResults}: Props) => {
  const label = puzzleImageMap.image.label
  const puzzleWordLetters = label.split('')
  return (
    <div className="PuzzleWord">
      {puzzleWordLetters.map((letter, index) => {
        const mappedResult = puzzleImageMap.letterToResultMap.get(letter) ?? '?'
        return (
          <div key={index} className="PuzzleWord--LetterResultPair">
            <DigitsDisplay value={mappedResult} />
            <div className="PuzzleWord--MappingArrow">
              ➼
            </div>
            <DigitsDisplay value={letter} hiddenOnPrint={true} hidden={!showResults}/>
          </div>
        )
      })}
    </div>
  )
}
