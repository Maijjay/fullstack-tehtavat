import { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter +1)
  const decreaseByOne = () => setCounter(counter -1)
  const setToZero = () => setCounter(0)

  return (
    <>
      <Display counter={counter}/>
      <Button
        handleClick={increaseByOne}
        text='plus'
      />
      <Button
        handleClick={decreaseByOne}
        text='minus'
      />
      <Button
        handleClick={setToZero}
        text='zero'
      />
    </>
  )
}

const Display = ({counter}) => <>{counter}</>
  

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button> 
  )
}

export default App