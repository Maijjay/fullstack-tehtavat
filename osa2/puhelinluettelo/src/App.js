import { useState } from 'react'
import Person from './components/Person'

const Filter = (props) => {
  return (
    <form>
      <h2>Numbers</h2>
      {props.personsToShow.map(person => 
      person.name.toLowerCase().includes(props.newFilter.toLowerCase()) ? <Person key = { person.name } person={ person } /> : null)}
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addPerson = (event) => {
    event.preventDefault()
    let found = false
    persons.forEach(person => {
      if (person.name == newName){
        found = true
        window.alert({newName}, " is already added to phonebook")
   
      }
    })
   
    if (found == false){
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length +1
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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
        
        <Filter personsToShow ={personsToShow} newFilter={newFilter}/>
      </ul>  
    </div>
  )

}

export default App
