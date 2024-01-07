import React, {useState, useEffect} from 'react'

import StatisticsLine from './StatisticsLine'

const Statistics = (props) => {
    const labels = props.alternatives
    const counts = props.counts

    const statisticsLines = []
    for (let i = 0; i < labels.length ; i++) {
        statisticsLines.push(<StatisticsLine label={labels[i]} value={counts[i]} key={i + 1} />)
    }
    const body = counts.find((value) => value > 0) ? <table>
                                                        <thead>
                                                            <tr>
                                                            <th>Label</th>
                                                            <th>Count</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {statisticsLines}
                                                            <tr>
                                                                <td>Total: {counts.reduce((acc, val) => acc + val)}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Average: {counts[0] * 1 + counts[2] * -1}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Positive: {counts[0] / (counts[0] + counts[1] + counts[2]) * 100}%</td>
                                                            </tr>
                                                        </tbody>
                                                    </table> : <p>No feedback available</p>

    return (
        <>
        <h1>Statistics</h1>
        {body}
        </>
    
    )
}

export default Statistics