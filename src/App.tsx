import './App.scss';
import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import {CollectionDisplay} from './display/CollectionDisplay/CollectionDisplay'
import {ConfigurationDisplay} from './display/ConfigurationDisplay/ConfigurationDisplay'
import {Config, Generator} from './generate/Generator'
import {Texts} from './Texts'
import {WorkSheetDisplay} from './display/WorkSheetDisplay/WorkSheetDisplay'

function App() {
  const [config, setConfig] = useState<Config>({
    locale: 'en',
    numberOfQuestions: 10,
    additionQuestionConfig: {
      enabled: true,
      resultMaxValue: 10,
      allowZero: false
    },
    subtractionQuestionConfig: {
      enabled: false,
      resultMaxValue: 10,
      allowZero: false
    },
    maxTextLength: 4,
    maxResponseImages: 20,
    showUppercase: true,
    showAnswers: false
  })

  useEffect(() => {
    document.title = Texts.text('title')
  }, [config.locale])

  const handleConfigurationOnChange = (config: Config) => {
    setConfig(config)
    Texts.locale = config.locale
  }

  const workSheet = new Generator(config).generate()
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/collection/">
            <div className="App--Collection">
              <CollectionDisplay />
            </div>
          </Route>
          <Route path="/">
            <div className="App--Configuration">
              <ConfigurationDisplay config={config} onChange={handleConfigurationOnChange} />
            </div>
            <div className="App--WorkSheet">
              <WorkSheetDisplay workSheet={workSheet} />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
