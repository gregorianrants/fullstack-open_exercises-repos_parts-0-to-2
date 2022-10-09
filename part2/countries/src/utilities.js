export function containsSubstring(subString,fullString){
    subString=subString.toLowerCase()
    fullString = fullString.toLowerCase()
    return subString===fullString.slice(0,subString.length)
}