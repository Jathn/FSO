import React, {useState, useEffect} from 'react'

const StatisticsLine = (props) => {
    const label = props.label
    const value = props.value

    return (
        <>
            <tr>
                <td>{label}</td> 
                <td>{value}</td>
            </tr>
        </>
    )
}

export default StatisticsLine