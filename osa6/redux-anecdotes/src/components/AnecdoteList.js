import { useDispatch, useSelector } from 'react-redux'
import React from "react"

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>    
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    </div>  
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
      return state.anecdotes
  })

  console.log(anecdotes)
  return (
    <div>
      {anecdotes.map(anecdote => <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => 
          dispatch({ type: 'VOTE', id: anecdote.id },
          dispatch({ type: 'notifications/newNotification', payload: anecdote.content })
          )} />
      )}
    </div>
  )
}

export default Anecdotes