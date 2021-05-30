import React, { useState, useEffect } from 'react';
import './App.css';
import tempService from './services/temps'
import '../node_modules/react-vis/dist/style.css';
import { Plot1, Plot3 } from './components/Plot';

function App() {

  const [ outsideTemps, setOutsideTemps ] = useState([])
  const [ insideTemps, setInsideTemps ] = useState([])
  const [ kitchenTemps, setKitchenTemps ] = useState([])
  const [ fridgeTemps, setFridgeTemps ] = useState([])
  const [ bathroomTemps, setBathroomTemps ] = useState([])
  const [ outsideTempsKaarina, setOutsideTempsKaarina ] = useState([])
  const [ insideTempsKaarina, setInsideTempsKaarina ] = useState([])
  const [ mh2TempsKaarina, setMh2TempsKaarina ] = useState([])
  const [ changeToSite, setChangeToSite ] = useState('Münster')

  const tempCollector = ( data, sensorId, setter ) => {  // Kerää lämpötilat
    var chosenTemps = []
    
    data.forEach((observation) => {
      if(parseInt(observation.sensorId) === sensorId) {
        chosenTemps.push({x: Date.parse(observation.date), y: observation.temperature})
      }
    })
    setter(chosenTemps)
  }

  const getCurrentTemp = (data) => {
    const filteredData = data.filter(item => item !== undefined)
    filteredData.sort((a,b) => a.date-b.date)
    if(filteredData[filteredData.length - 1] !== undefined) {
      console.log(filteredData[filteredData.length - 1].y)
      return filteredData[filteredData.length - 1].y
    }
  }

  useEffect(() => {
    tempService.getRecent().then(response => {
      tempCollector(response, 3, setOutsideTemps)
      tempCollector(response, 2, setInsideTemps)
      tempCollector(response, 4, setKitchenTemps)
      tempCollector(response, 5, setFridgeTemps)
      tempCollector(response, 1, setBathroomTemps)
      tempCollector(response, 10, setOutsideTempsKaarina)
      tempCollector(response, 11, setInsideTempsKaarina)
      tempCollector(response, 8, setMh2TempsKaarina)
    })
  }, [changeToSite])

  const changeSiteHandler = () => {
    if(changeToSite==='Kaarina') {
      setChangeToSite('Münster')
    } else {
      setChangeToSite('Kaarina')
    }
  }

  const muenster = { display: changeToSite==='Kaarina' ? '' : 'none' }
  const kaarina = { display: changeToSite==='Münster' ? '' : 'none' }

  return (
    <div className='main'>
      <div className='button'>
        <p>Vaihda paikkaa:</p>
        <button onClick={changeSiteHandler}>{changeToSite}</button>
      </div>
      <div className='plots'>
        <div className='muenster' style={muenster}>
          <h1>Münsterin lämpötilat</h1>
          <div className='sideBySide'>
            <Plot1 tempData={outsideTemps} current={getCurrentTemp(outsideTemps)} title={'Ulkolämpötila'} />
            <Plot1 tempData={insideTemps} current={getCurrentTemp(insideTemps)} title={'Sisälämpötila'} />
          </div>
          <div className='sideBySide'>
            <Plot1 tempData={kitchenTemps} current={getCurrentTemp(kitchenTemps)} title={'Keittiön lämpötila'} />
            <Plot1 tempData={fridgeTemps} current={getCurrentTemp(fridgeTemps)} title={'Jääkaapin lämpötila'} />
          </div>
          <div className='sideBySide'>
            <Plot1 tempData={bathroomTemps} current={getCurrentTemp(bathroomTemps)} title={'Kylpyhuoneen lämpötila'} />
            <Plot3 tempData1={insideTemps} title1={'Olohuone'} tempData2={kitchenTemps} title2={'Keittiö'} tempData3={bathroomTemps} title3={'Kylpyhuone'} header={'Sisälämpötilat'} />
          </div>
        </div>
        <div className='kaarina' style={kaarina}>
          <h1>Kaarinan lämpötilat</h1>
          <div className='sideBySide'>
            <Plot1 tempData={outsideTempsKaarina} current={getCurrentTemp(outsideTempsKaarina)} title={'Ulkolämpötila'} />
            <Plot1 tempData={insideTempsKaarina} current={getCurrentTemp(insideTempsKaarina)} title={'Sisälämpötila'} />
          </div>
          <div className='sideBySide'>
            <Plot1 tempData={mh2TempsKaarina} current={getCurrentTemp(mh2TempsKaarina)} title={'Makuuhuone 2'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
