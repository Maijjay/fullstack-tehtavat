import { useState } from 'react'


const Header = ()=> {
  return (
    <h1>give feedback</h1>
  )
}

const StatisticLine = (props) => {
  return (
   <div>
     <>
      {props.text} {props.value}
     </>
   </div>
  )
}

const Statistics = (props) => {
  if(props.all == 0){
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  const average = (props.good + (-1 * props.bad)) / props.all
  const positive = (props.good/props.all) * 100  
  return (
    <>
      <h1>statistics</h1>
      <tr>
        <StatisticLine text="good:" value={props.good}/>
        <StatisticLine text="neutral:" value={props.neutral}/>
        <StatisticLine text="bad:" value={props.bad}/>
        <StatisticLine text="all:" value={props.all}/>
        <StatisticLine text="average:" value={average}/>
        <StatisticLine text="positive:" value={positive} />
      </tr>
    </>
  )
}



const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const App = (props) => {

  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0, all: 0
  })

  const handleGoodClick = () => {
    setClicks({...clicks, good: clicks.good + 1, all: clicks.all +1})
  }

  const handleNeutralClick = () => {
    setClicks({...clicks, neutral: clicks.neutral + 1, all: clicks.all +1})
  }

  const handleBadClick = () => {
    setClicks({...clicks, bad: clicks.bad + 1, all: clicks.all +1})
  }

  
    return (
      <div>
        <>
          <Header/>
          <Button handleClick = {handleGoodClick} text='good' Button/>
          <Button handleClick = {handleNeutralClick} text ='neutral' Button/>
          <Button handleClick = {handleBadClick} text='bad' Button/>
          <Statistics good={clicks.good} neutral={clicks.neutral} bad={clicks.bad} all={clicks.all}/>
        </>
      </div>
    );
}

export default App;
