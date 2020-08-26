import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import Plot from './components/Plot'



function App() {

  const [ outsideTemps, setOutsideTemps ] = useState([])
  const [ insideTemps, setInsideTemps ] = useState([])
  const [ kitchenTemps, setKitchenTemps ] = useState([])
  const [ fridgeTemps, setFridgeTemps ] = useState([])
  const [ bathroomTemps, setBathroomTemps ] = useState([])

  const tempCollector = ( data, sensor, setter ) => {  // Kerää lämpötilat
    var chosenTemps = []

    data.forEach((observation) => {
      if(observation.name === sensor) {
        chosenTemps.push({x: Date.parse(observation.date), y: observation.temperature})
      }
    })
    //console.log(outTemps)
    setter(chosenTemps)
  }

  const getCurrentTemp = (data) => {
    const filteredData = data.filter(item=> item !== undefined)
    filteredData.sort((a,b) => a.date-b.date)
    if(filteredData[filteredData.length - 1] !== undefined) {
      return filteredData[filteredData.length - 1].y
    }
    
  }

  useEffect(() => {
    axios.get('http://localhost:4001/api/temps')
      .then(response => {
        tempCollector(response.data, 'Ulkolämpötila', setOutsideTemps)
        tempCollector(response.data, 'Olohuone', setInsideTemps)
        tempCollector(response.data, 'Keittiö', setKitchenTemps)
        tempCollector(response.data, 'Jääkaappi', setFridgeTemps)
        tempCollector(response.data, 'Suihku', setBathroomTemps)
        //console.log(response.data)
      })
  }, [])

    return (
      <div>
        <div className='sideBySide'>
          <Plot tempData={outsideTemps} current={getCurrentTemp(outsideTemps)} title={'Ulkolämpötila'} />
          <Plot tempData={insideTemps} current={getCurrentTemp(insideTemps)} title={'Sisälämpötila'} />
        </div>
        <div className='sideBySide'>
          <Plot tempData={kitchenTemps} current={getCurrentTemp(kitchenTemps)} title={'Keittiön lämpötila'} />
          <Plot tempData={fridgeTemps} current={getCurrentTemp(fridgeTemps)} title={'Jääkaapin lämpötila'} />
        </div>
        <div className='sideBySide'>
          <Plot tempData={bathroomTemps} current={getCurrentTemp(bathroomTemps)} title={'Kylpyhuoneen lämpötila'} />
        </div>
      </div>
    );
}

export default App;
