import { useState,useEffect } from 'react'
import axios from "axios";

function getId(){
    return Math.floor(Math.random()*10**10)
}

function uniqueName(newName,persons){
    return persons.map(({name})=>name).indexOf(newName)===-1
}


function Persons({persons,filter}){

    function match(subString,personName){
        subString=subString.toLowerCase()
        personName = personName.toLowerCase()
        return subString===personName.slice(0,subString.length)
    }

    const filteredPersons = persons.filter(({name})=>match(filter,name))

    return (
            <ul>
                {filteredPersons.map(({name,number,id})=>
                    <li key={id}>{name}{' '}{number}</li>
                )}
            </ul>
    )
}

function Form({handleNameChange,handleNumberChange,handleSubmit}){
    return (
            <form>
                <div>
                    name: <input onChange={handleNameChange}/>
                </div>
                <div>
                    number: <input onChange={handleNumberChange}/>
                </div>
                <div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                    >add</button>
                </div>
            </form>


    )
}

function Filter({handleFilterChange}){
    return (
        <div>
            filter shown with <input onChange={handleFilterChange}/>
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3001/persons')
            .then(res=>{
                setPersons(res.data)
            })
    },[])


    const [filter,setFilter] = useState('')
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')


    const handleNameChange = (e)=>{
        setNewName(e.target.value)
    }

    const handleNumberChange = (e)=>{
        setNewNumber(e.target.value)
    }

    const handleFilterChange= (e)=>{
        setFilter(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(!uniqueName(newName,persons)){
            alert(`${newName} is already added to the phone book`)
            return
        }
        setPersons([...persons,{
            name: newName,
            number: newNumber,
            id: getId()
        }])
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleFilterChange={handleFilterChange}/>
            <h2>Add a new</h2>
            <Form {...{handleNameChange,handleNumberChange,handleSubmit}}/>
            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter}/>

        </div>
    )
}

export default App