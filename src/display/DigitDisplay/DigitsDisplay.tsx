import './DigitsDisplay.scss'
import React from 'react'

type Props = {
  value: number | string
  hiddenOnPrint?: boolean
  hidden?: boolean
  minLength?: number
}

export const DigitsDisplay = ({value, hiddenOnPrint = false, hidden = false, minLength = 1}: Props) => {
  const caseValue = `${value}`
  const digits = caseValue.padStart(minLength, ' ').split('')
  return (
    <div className="Digits">
      {digits.map((digit, index) =>
        <div key={index} className={`Digits--Digit${hiddenOnPrint ? ' Digits--HiddenOnPrint' : ''}${hidden ? ' Digits--Hidden' : ''}`}>
          <span>{digit}</span>
        </div>
      )}
    </div>
  )
}
