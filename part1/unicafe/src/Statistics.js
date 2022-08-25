import React from "react";
import {sum, getAverage, getPercentage, getTotalScore, allTruthy, atLeaseOneTrue} from "./utilityFunctions.mjs";


export const StatisticLine = ({text, value}) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

const Statistics = ({good, neutral, bad}) => {
    const feedbackCount = sum([good, neutral, bad])
    const averageScore = getAverage(getTotalScore({good, neutral, bad}), feedbackCount)
    const percentagePositive = (getPercentage([good], [good, neutral, bad]) + '%'
        || 'no feedback to calculate a % with yet')

    return (
        atLeaseOneTrue([good, neutral, bad])
            ?
            <table>
                <tbody>
                <StatisticLine text={'good'} value={good}/>
                <StatisticLine text={'neutral'} value={neutral}/>
                <StatisticLine text={'bad'} value={bad}/>
                <StatisticLine text={'all'} value={sum([good, neutral, bad])}/>
                <StatisticLine text={'average'} value={averageScore}/>
                <StatisticLine text={'positive'} value={percentagePositive}/>
                </tbody>
            </table>
            :
            null
    )
}

export default Statistics