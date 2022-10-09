import {getName} from "./countryLookups";


function Country({name,setFilter}){
    function handleClick(){
        setFilter(name)
    }
    return (
        <li >
            {name}
            <button
            onClick={handleClick}
            >
                show
            </button>
        </li>
    )
}


function CountriesList({countries,setFilter}){
    function getId(country){
        return country['latlng'].map(num=>String(num)).join('')
    }

    return (
        <ul>
            {countries.map(country => (
               <Country
                   key={getId(country)}
                   name={getName(country)}
                   setFilter={setFilter}
               />
            ))}
        </ul>
    )
}

export default CountriesList