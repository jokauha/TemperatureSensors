import React from 'react';
import '../../node_modules/react-vis/dist/style.css';
import '../App.css'
import {
    XYPlot,
    XAxis,
    YAxis,
    ChartLabel,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeries
  } from '../../node_modules/react-vis';

const Line = LineSeries;

const Plot = ({ tempData, current, title }) => {

    return (
        <div>
            <h2>{title}</h2>
            <h3>{current} &deg;C</h3>
            <XYPlot xType='time' width={500} height={300}>
            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis />
            <YAxis />
            <ChartLabel
                //text="X Axis"
                className="alt-x-label"
                includeMargin={false}
                xPercent={0.025}
                yPercent={1.01}
                />

            <ChartLabel
                text="Lämpötila"
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
                className={title}
                data={tempData}
            />
            </XYPlot>
        </div>
    )
}

export default Plot