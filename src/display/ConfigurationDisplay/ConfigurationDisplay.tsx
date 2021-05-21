import './ConfigurationDisplay.scss'
import React from 'react'
import { useHistory } from 'react-router-dom'
import {WorksheetConfig, MAXIMUM_RESULT_VALUE_LIST, MAXIMUM_TEXT_LENGTH_LIST} from '../../generate/WorksheetGenerator'
import {Texts} from '../../Texts'

type Props = {
  config: WorksheetConfig
  onChange: (config: WorksheetConfig) => void
}

export const ConfigurationDisplay = ({config, onChange}: Props) => {
  const history = useHistory()
  return (
    <form className="Configuration" noValidate onSubmit={() => {}}>
      <h1>{Texts.text('title')}</h1>

      <h2>{Texts.text('config-section-title-general')}</h2>

      <label>
        <span>{Texts.text('config-language')}</span>
        <select
          value={config.locale}
          onChange={input => onChange({...config, locale: input.target.value})}
        >
          <option value="en">English</option>
          <option value="ro">Română</option>
        </select>
      </label>

      <label>
        <span>{Texts.text('config-number-of-questions')}</span>
        <select
          value={config.numberOfQuestions}
          onChange={input => onChange({...config, numberOfQuestions: parseInt(input.target.value, 10)})}
        >
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </label>

      <label>
        <span>{Texts.text('config-maximum-name-length')}</span>
        <select
          value={config.maxTextLength}
          onChange={input => onChange({...config, maxTextLength: parseInt(input.target.value, 10)})}
        >
          {MAXIMUM_TEXT_LENGTH_LIST.map(v =>
            <option key={v} value={v}>{v < 1001 ? v : Texts.text('config-unlimited')}</option>
          )}
        </select>
      </label>

      <label className="Label--Checkbox">
        <input
          type="checkbox"
          checked={config.showUppercase}
          onChange={input => onChange({...config, showUppercase: input.target.checked})}
        />
        <span>{Texts.text('config-uppercase-letters')}</span>
      </label>

      <label>
        <span>{Texts.text('config-maximum-number-of-response-images')}</span>
        <select
          value={config.maxResponseImages}
          onChange={input => onChange({...config, maxResponseImages: parseInt(input.target.value, 10)})}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </label>

      <h2>{Texts.text('config-qgen-addition')}</h2>

      <label className="Label--Checkbox">
        <input
          type="checkbox"
          checked={config.additionQuestionConfig.enabled}
          onChange={input => onChange({
            ...config,
            additionQuestionConfig: {
              ...config.additionQuestionConfig,
              enabled: input.target.checked
            }
          })}
        />
        <span>{Texts.text('config-qgen-enabled')}</span>
      </label>

      <label>
        <span>{Texts.text('config-qgen-result-maximum-value')}</span>
        <select
          value={config.additionQuestionConfig.resultMaxValue}
          onChange={input => onChange({
            ...config,
            additionQuestionConfig: {
              ...config.additionQuestionConfig,
              resultMaxValue: parseInt(input.target.value)
            }
          })}
        >
          {MAXIMUM_RESULT_VALUE_LIST.map(v =>
            <option key={v} value={v}>{v}</option>
          )}
        </select>
      </label>

      <label className="Label--Checkbox">
        <input
          type="checkbox"
          checked={config.additionQuestionConfig.allowZero}
          onChange={input => onChange({
            ...config,
            additionQuestionConfig: {
              ...config.additionQuestionConfig,
              allowZero: input.target.checked
            }
          })}
        />
        <span>{Texts.text('config-qgen-allow-zero')}</span>
      </label>

      <h2>{Texts.text('config-qgen-subtraction')}</h2>

      <label className="Label--Checkbox">
        <input
          type="checkbox"
          checked={config.subtractionQuestionConfig.enabled}
          onChange={input => onChange({
            ...config,
            subtractionQuestionConfig: {
              ...config.subtractionQuestionConfig,
              enabled: input.target.checked
            }
          })}
        />
        <span>{Texts.text('config-qgen-enabled')}</span>
      </label>

      <label>
        <span>{Texts.text('config-qgen-result-maximum-value')}</span>
        <select
          value={config.subtractionQuestionConfig.resultMaxValue}
          onChange={input => onChange({
            ...config,
            subtractionQuestionConfig: {
              ...config.subtractionQuestionConfig,
              resultMaxValue: parseInt(input.target.value)
            }
          })}
        >
          {MAXIMUM_RESULT_VALUE_LIST.map(v =>
            <option key={v} value={v}>{v}</option>
          )}
        </select>
      </label>

      <label className="Label--Checkbox">
        <input
          type="checkbox"
          checked={config.subtractionQuestionConfig.allowZero}
          onChange={input => onChange({
            ...config,
            subtractionQuestionConfig: {
              ...config.additionQuestionConfig,
              allowZero: input.target.checked
            }
          })}
        />
        <span>{Texts.text('config-qgen-allow-zero')}</span>
      </label>


      <h2>{Texts.text('config-section-title-preview')}</h2>

      <label className="Label--Checkbox">
        <input
          type="checkbox"
          checked={config.showAnswers}
          onChange={input => onChange({...config, showAnswers: input.target.checked})}
        />
        <span>{Texts.text('config-show-answers')}</span>
      </label>

      <div className="Configuration--Buttons">
        <button type="button" className="Button" onClick={() => onChange({...config})}>
          <span className="Button--Icon">⠶</span>
          <span className="Button--Text">{Texts.text('config-regenerate')}</span>
        </button>
        <button type="button" className="Button" onClick={window.print}>
          <span className="Button--Icon">⎙</span>
          <span className="Button--Text">{Texts.text('config-print')}</span>
        </button>
      </div>

      <p>
        <button className="Button--ButtonLink" onClick={() => history.push('collection')}>Print collection</button>
      </p>
    </form>
  )
}
