import axios from "axios";
import {useEffect,useState} from "react";
import CountriesList from "./CountriesList";
import {containsSubstring} from "./utilities";
import {getName} from "./countryLookups";
import Details from "./Details";



function App() {
  const [countries,setCountries] = useState([])
  const [filter,setFilter]=useState('')

  const filtered = countries.filter(country=>containsSubstring(filter,getName(country)))

  const handleFilterChange = (e)=>setFilter(e.target.value)

  useEffect(()=>{
    axios.get(`https://restcountries.com/v3.1/all`)
        .then(res=> {
          console.log(res.data)
          setCountries(res.data)
        })
  },[])

  const tooMany = (filtered)=>filtered.length>=10
  const onlyOne = (filtered)=>filtered.length===1

  let content;

  if(tooMany(filtered)){
    content = <p>Too many matches, specify another filter</p>
  }
  else if(onlyOne(filtered)){
    content = <Details country={filtered[0]}/>
  }
  else{
    content =  <CountriesList countries={filtered}  setFilter={setFilter}/>
  }

  return (
    <div className="App">
      find countries: <input type="text" value={filter} onChange={handleFilterChange}/>
      {content}
    </div>
  );
}

export default App;
