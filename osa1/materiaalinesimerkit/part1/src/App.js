

const Hello = ({name, age}) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born {bornYear()}</p>

    </>
  )
}

const Footer = () => {
  return (
    <>
      Greeting app created by 
      <a href = "https://github.com/Maijjay/"> Maijjay</a>
    </>
  )
}

const App = () => {
  const nimi = 'Pekka'
  const ika = 15
  
  return (
    <>
      <h1>Greetings</h1>
      <Hello name= "Emma" age={2500}/>
      <Hello name={nimi} age={ika} />
      <Footer />
    </>
  )
}

export default App

