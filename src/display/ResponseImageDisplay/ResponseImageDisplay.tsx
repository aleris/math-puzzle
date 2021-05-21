import './ResponseImageDisplay.scss'
import React from 'react'

type Props = {
  category: string
  name: string
  label: string
}

export const ResponseImageDisplay = ({category, name, label}: Props) => {
  return (
    <div className="ResponseImage">
      <div className="ResponseImage--CheckImage">
        <div />
        <img src={`${process.env.PUBLIC_URL}/assets/${category}/${name}.svg`} alt={label}/>
      </div>
      <div className="ResponseImage--Label">{label}</div>
    </div>
  )
}
