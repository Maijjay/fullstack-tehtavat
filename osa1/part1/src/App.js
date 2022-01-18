

const Hello = (props) => {
  return (
    <>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
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

