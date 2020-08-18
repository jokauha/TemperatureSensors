import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import '../node_modules/react-vis/dist/style.css';

import {
  XYPlot,
  XAxis,
  YAxis,
  ChartLabel,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries
} from 'react-vis';

function App() {

  const [ outsideTemps, setOutsideTemps ] = useState([])

  const outsideTempCollector = (props) => {  // Kerää ulkolämpötilat
    var outTemps = []
    //console.log(props)
    props.forEach((observation) => {
      if(observation.name === 'ulko') {
        outTemps.push({x: Date.parse(observation.date), y: observation.temperature})
      }
    })
    //console.log(outTemps)
    setOutsideTemps(outTemps)
  }

  useEffect(() => {
    axios.get('http://localhost:3001/api/temps')
      .then(response => {
        outsideTempCollector(response.data)
        //console.log(response.data)
      })
  }, [])

    const Line = LineSeries;

    return (

      <div>

        <XYPlot xType='time' width={1000} height={300}>
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis />
          <YAxis />
          <ChartLabel
            text="X Axis"
            className="alt-x-label"
            includeMargin={false}
            xPercent={0.025}
            yPercent={1.01}
            />

          <ChartLabel
            text="Y Axis"
            className="alt-y-label"
            includeMargin={false}
            xPercent={0.06}
            yPercent={0.06}
            style={{
              transform: 'rotate(-90)',
              textAnchor: 'end'
            }}
            />
          <Line
            className="Ulkolämpötila"
            data={outsideTemps}
          />
        </XYPlot>
      </div>

    );
}

export default App;
