import './CollectionDisplay.scss'
import React, {useState} from 'react'
import {Texts} from '../../Texts'

export const CollectionDisplay = () => {
  const [title, setTitle] = useState(Texts.text('collection-title',  ''))
  return (
    <div className="Collection">
      <div className="Collection--Print">
        <div className="Collection--Name">
          <input type="text" placeholder="Name" onChange={input => setTitle(Texts.text('collection-title', input.target.value))} />
        </div>
        <button type="button" className="Button" onClick={window.print}>
          <span className="Button--Icon">⎙</span>
          <span className="Button--Text">{Texts.text('config-print')}</span>
        </button>
      </div>

      <div className="Collection--Page">
        <h1 className="Collection--Title">{title}</h1>
        <div className="Collection--Images">
          {Texts.allImages().map(imageItem =>
            <div key={imageItem.name} className="Collection--Image">
              <img src={`${process.env.PUBLIC_URL}/assets/animals/${imageItem.name}.svg`} alt={imageItem.label} />
              <span>{imageItem.label}</span>
            </div>
          )}
        </div>
        <p className="Collection--Attributions">{Texts.text('attributions')}</p>
      </div>
    </div>
  )
}
