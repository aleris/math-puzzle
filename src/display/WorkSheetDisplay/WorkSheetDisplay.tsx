import './WorkSheetDisplay.scss'
import React from 'react'
import {DifficultyDisplay} from '../DifficultyDisplay/DifficultyDisplay'
import {WorkSheet} from '../../generate/WorksheetGenerator'
import {PuzzleWordMap} from '../PuzzleWordMap/PuzzleWordMap'
import {QuestionDisplay} from '../QuestionDisplay/QuestionDisplay'
import {ResponseImageDisplay} from '../ResponseImageDisplay/ResponseImageDisplay'
import {Texts} from '../../Texts'

type Props = {
  workSheet: WorkSheet
}

export const WorkSheetDisplay = ({workSheet}: Props) => {
  return (
    <div className="WorkSheet">
      <div className="WorkSheet--Difficulty"><DifficultyDisplay value={workSheet.difficulty} /></div>
      <h1 className="WorkSheet--Title">{Texts.text('worksheet-title')}</h1>

      <p className="WorkSheet--Instructions">{Texts.text('instructions-1')}</p>

      <div className="WorkSheet--Questions">
        {workSheet.questions.map((question, index) =>
          <div key={index} className="WorkSheet--Question">
            <QuestionDisplay question={question} showResults={workSheet.config.showAnswers} />
          </div>
        )}
      </div>

      <p className="WorkSheet--Instructions">{Texts.text('instructions-2')}</p>

      <PuzzleWordMap
        puzzleImageMap={workSheet.puzzleImageMap}
        showResults={workSheet.config.showAnswers}
      />

      <p className="WorkSheet--Instructions">{Texts.text('instructions-3')}</p>

      <div className="WorkSheet--Response">
        {workSheet.responseImagesSlice.map((image, index) =>
          <ResponseImageDisplay
            key={index}
            category="animals"
            name={image.name}
            label={image.label}
          />
        )}
      </div>

      <p className="WorkSheet--Attributions">{Texts.text('attributions')}</p>
    </div>
  )
}
