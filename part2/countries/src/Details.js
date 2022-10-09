import {getName} from "./countryLookups";
import axios from "axios";
import {useEffect,useState} from "react";

const API_KEY = process.env.REACT_APP_API_KEY

function Weather({cityName,lat,long}){
    const [temp,setTemp] = useState(null)
    const [wind,setWind] = useState(null)
    const [icon,setIcon] = useState(null)

    const tempCentigrade = (temp - 273.15).toLocaleString()
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`


    useEffect(()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`)
            .then(res=>res.data)
            .then(data=> {
                    setTemp(data.main.temp)
                    setWind(data.wind.speed)
                    setIcon(data.weather[0].icon)
                }
            )
    },[])

    return (
        <>
            <h3>Weather in {cityName}</h3>
            <p>temperature: {tempCentigrade} Celcius</p>
            {icon ? <img src={iconUrl} alt=""/> : null}
            <p>wind: {wind} m/s</p>
        </>
    )
}


function Details({country}){

    const {capital,capitalInfo,area,coatOfArms} = country
    const [lat,long] = capitalInfo['latlng']
    const languages = Object.values(country.languages)
    const flagSrc = coatOfArms.svg
    return (
        <>
        <h2>{getName(country)}</h2>

            <p>capital: {capital}</p>
            <p>area: {area}</p>

            <h3>languages:</h3>
            <ul>
                {languages.map(language=>(
                    <li key={language}>{language}</li>)
                )}
            </ul>
            <img style={{'width': '200px'}} src={flagSrc} alt="flag of country"/>
            <Weather cityName={capital} lat={lat} long={long}/>
        </>
    )
}

export default Details