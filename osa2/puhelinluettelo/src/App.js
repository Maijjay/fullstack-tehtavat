import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import personService from './services/persons'


const Filter = (props) => {
  return (
    <form>
      <h2>Numbers</h2>
      {props.personsToShow.map(person => 
      person.name.toLowerCase().includes(props.newFilter.toLowerCase()) 
      ? <div key={ person.name }>
        <Person key = { person.name } person={ person } />
        <button onClick={() => props.handleClick({ person })}> delete </button>  
        </div> 
        : null)
      }
      
   </form>
  )
}

const AddPerson = (props) => {
  return(
  <>
    <div>
      name: <input
        value={props.newName}
        onChange={props.handlePersonChange}
        />
      number: <input
        value={props.newNumber}
        onChange={props.handleNumberChange}
        />  
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </>
  )
}

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState()
  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }
  
  useEffect(() => hook(), [])

  const addPerson = (event) => {
    event.preventDefault()
    let found = false
    persons.forEach(person => {
      if (person.name === newName){
        found = true
        const accepted = window.confirm(`${newName}, is already added to phonebook, replace the old number with a new one?`)
        if (accepted){
          const personObject = {
            name: newName,
            number: newNumber
          }
          personService
            .update(person.id, personObject)
            .then(() => hook())
         
        }
      
      }
    })  
    if (found === false){  
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    event.preventDefault()

    setNewFilter(event.target.value)
  }

  const handleClick = ({person}) => {
    console.log(person)
    const accepted = window.confirm(`Delete ${person.name}`)
    
    if (accepted) {
      personService
        .remove(person.id)
    } else {
        console.log("ASD")
    }

  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase.includes(newFilter.toLowerCase) === true)
  
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input
        value={newFilter}
        onChange={handleFilterChange}/>
      <ul>
        <form onSubmit={addPerson}>
          <AddPerson newName={newName} handlePersonChange={handlePersonChange} newFilter={newNumber} handleNumberChange={handleNumberChange}/>
        </form>   
        <Filter personsToShow ={personsToShow} newFilter={newFilter} handleClick={handleClick}/> 
      </ul>  
    </div>
  )

}

export default App
