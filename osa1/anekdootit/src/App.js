import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>  
)

const Anecdote = (props) => {
  const s = props.selected
  return (
    <>
      <p>{props.anecdotes[s]} </p> 
    </>
  )
}

const Header = (props) => {
  return (
    <h1>
      {props.text}
    </h1> 
  )
}

const BestAnecdote = (props) => {
  const best = Math.max(...props.votes)
  const index = props.votes.indexOf(best) 
  return (
    <>
      <p>{props.anecdotes[index]} </p> 
      <p>has {best} votes</p>
    </>
  )
}
  

const App = (props) => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [votes, setVotes]= useState(new Uint8Array(anecdotes.length))
  const [selected, setSelected] = useState(0)

  const handleVoteClick = (props) => {
    const copy = [...votes]
    copy[selected] += 1
    console.log('vote', copy)

    setVotes( copy )
    console.log(selected)
    console.log('vote', copy)
  }
  
  const handleNextClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
    console.log(selected)
  }

  return (
    <div>
      <Header text = 'Anecdote of the day'/>
      <Button handleClick = {handleVoteClick} text = 'vote' Button/>
      <Button handleClick = {handleNextClick} text = 'next anecdote' Button/>
      <Anecdote anecdotes={anecdotes} selected={selected}/>
      <Header text = 'Anecdote with most votes'/>
      <BestAnecdote votes = {votes} anecdotes = {anecdotes}/>
    </div>
  )
}

export default App