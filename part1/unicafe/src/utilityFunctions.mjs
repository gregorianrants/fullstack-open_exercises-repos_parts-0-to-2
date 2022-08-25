import React from "react";

export const sum=(values)=>values.reduce((a, b) => a + b, 0)

export const getAverage =(total,n)=> {
    if (n === 0) return 0
    return total / n
}

export const getPercentage=(portion,all)=>{
    if(sum(all)===0) return undefined
    return (sum(portion)/sum(all))*100
}

export function allTruthy(values){
    return values.reduce((a,b)=>!(!a || !b),true)
}

export function atLeaseOneTrue(values){
    return values.reduce((a,b)=>Boolean(a || b),false)
}

export const getTotalScore =({good,neutral,bad})=>sum([good,0*neutral,-bad])
