import React, { useState } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import '../App.css'
import {
    XYPlot,
    XAxis,
    YAxis,
    ChartLabel,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeries,
    Crosshair,
    DiscreteColorLegend
  } from '../../node_modules/react-vis';

const Line = LineSeries;

const Plot3 = ({ tempData1, title1, current1, tempData2, title2, current2, tempData3, title3, current3, header }) => {

    const legend1 = title1
    const legend2 = title2
    const legend3 = title3
    const itemss = [
        legend1,
        legend2,
        legend3
    ]
    return (
        <div>
            <h2>{header}</h2>
            <DiscreteColorLegend width={100} items={itemss} />
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
                className={title1}
                data={tempData1}
            />
            <Line
                className={title2}
                data={tempData2}
            />
            <Line
                className={title3}
                data={tempData3}
            />
            </XYPlot>
        </div>
    )
}

const Plot1 = ({ tempData, current, title }) => {

    const [ crosshairValues, setCrosshairValues ] = useState([])

    const _onMouseLeave = () => {
        setCrosshairValues([])
    }

    const _onNearestX = (value, {index}) => {
        setCrosshairValues(tempData.map(d => d[index]))
    }

    return (
        <div>
            <h2>{title}</h2>
            <h3>{current} &deg;C</h3>
            <XYPlot xType='time' onMouseLeave={_onMouseLeave} width={500} height={300}>
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
                onNearestX={_onNearestX}
                data={tempData}
            />
            <Crosshair values={crosshairValues} className={'crosshair'} />
            </XYPlot>
        </div>
    )
}

export { Plot1, Plot3 }