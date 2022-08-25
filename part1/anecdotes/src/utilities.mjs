export function random(max){
    return Math.floor(Math.random()*(max+1))
}

export function zeros(length){
    return [...Array(length)].map(el=>0)
}

export function max(array){
    return array.reduce((a,b)=>a>b?a:b)
}

export function indexOfMax(array){
    return array.indexOf(max(array))
}