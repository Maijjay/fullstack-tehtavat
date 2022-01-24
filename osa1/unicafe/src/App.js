import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const App = (props) => {

  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0, all: 0
  })

  const Header = ()=> {
    return (
      <h1>give feedback</h1>
    )
  }

  const handleGoodClick = () => {
    console.log(props)

    setClicks({...clicks, good: clicks.good + 1, all: clicks.all +1})
  }

  const handleNeutralClick = () => {
    setClicks({...clicks, neutral: clicks.neutral + 1, all: clicks.all +1})
  }

  const handleBadClick = () => {
    setClicks({...clicks, bad: clicks.bad + 1, all: clicks.all +1})
  }

  const Statistics = (props) => {
    console.log(props)

    return (
      <>
      <h1>statistics</h1>
      <p>good: {props.good}</p>
      </>
      )
  }
    return (
    <div>
      <>
        <Header/>
        <Button handleClick = {handleGoodClick} text='good' Button/>
        <Button handleClick = {handleNeutralClick} text ='neutral' Button/>
        <Button handleClick = {handleBadClick} text='bad' Button/>
        <Statistics good={props.good}/>
        
      </>
    </div>
  );
}

export default App;
