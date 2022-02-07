import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
  <>
    {
    props.countriesToShow.length > 10
      ? 'Too many matches, specify another filter'
      : props.countriesToShow.length > 1
        ? props.countriesToShow.map(country => (
          <ul>
          {country.name}
          <button 
            key={country.name}
            onClick={ () => props.setShow([ country ])}>
            show
          </button>
          </ul>
        ))
        : props.countriesToShow.length === 1
          ? (<div>
             <ShowCountry country={props.countriesToShow[0]}/>
            </div>
          )
          : 'no matches'
      }
  </>
  )
}

const ShowCountry = ({ country }) =>{
  return (
    <> 
      <h2>{country.name}</h2>
      <div>capital: {country.capital}</div>
      <div>area: {country.area}</div>
      <h3>languages:</h3>
      <ul>
      {country.languages.map(({ name }) => <li> { name } </li> )}
      </ul>
      <img alt={`${country.name} flag`} src={country.flag} width="200" />
      {/* <GetWeather/> */}
    </>
  )
}

// const GetWeather = () => {
//   useEffect(() =>{
//     axios
//       .get('http://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&lang={lang}')
//       .then(response => {
//         setCountries(response.data)
//         console.log(response.data)
//       }) 
//   }, [])
//   console.log('render', countries.length, 'countries')
// }


const App = () => {
  const [filter, setFilter] = useState('')
  const[countries, setCountries] = useState([])
  const [countriesToShow, setShow] = useState([])

  useEffect(() =>{
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data)
        console.log(response.data)
      }) 
  }, [])
  console.log('render', countries.length, 'countries')


  const handleFilterChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    console.log(filter)

    setFilter(event.target.value)

    let c = countries.filter(country =>
      country.name.toLowerCase().includes(filter.toLowerCase()))
    setShow(c)
  }
  
  console.log(countriesToShow)
  return (
    <div>
      <form onSubmit={setFilter}>
      find countries: <input value = {filter} onChange={handleFilterChange}/>
      </form>
      <Filter countriesToShow={countriesToShow} setShow={setShow}/>
    </div>
  )
}

export default App;
