import './DifficultyDisplay.scss'
import React from 'react'

type Props = {
  value: number
}

export const DifficultyDisplay = ({value}: Props) => {
  const list = Array.from({length: 5}).map((_, index) => index < value)
  return (
    <div className="Difficulty">
      {list.map((isOn, index) =>
        <div key={index} className='Difficulty--Star'>
          <span>{isOn ? '★' : '☆'}</span>
        </div>
      )}
    </div>
  )
}
