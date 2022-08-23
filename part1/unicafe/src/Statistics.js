import React from "react";

const Statistic = ({name, value}) => <p>{name} {value}</p>

const sum=(values)=>values.reduce((a, b) => a + b, 0)

const getAverage =(values=[])=> {
    if (values.length === 0) return 0
    return sum(values) / values.length
}

const getPercentage=(portion=[],all=[])=>all.length ? (sum(portion)/sum(all)) : 0


const Statistics =({good,neutral,bad})=>{
    const average = getAverage([good,neutral,bad])
    const percentagePositive = getPercentage([good,neutral],[good,neutral,bad])

    return (
        <>
            <Statistic name={'good'} value={good}/>
            <Statistic name={'neutral'} value={neutral}/>
            <Statistic name={'bad'} value={bad}/>
            <Statistic name={'average'} value={average}/>
            <Statistic name={'positive'} value={percentagePositive}/>
        </>
    )
}

export default Statistics