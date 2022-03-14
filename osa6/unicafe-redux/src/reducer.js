const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newGood = state.good +1
      const newGoodState = {
        good: newGood,
        ok : state.ok,
        bad : state.bad
      }
      state = newGoodState
      return state
    case 'OK':
      const newOk = state.ok +1
      const newOkState = {
        good: state.good,
        ok : newOk,
        bad : state.bad
      }
      state = newOkState
      return state
    case 'BAD':
      const newBad = state.bad +1
      const newBadState = {
        good: state.good,
        ok : state.ok,
        bad : newBad
      }
      state = newBadState
      return state
    case 'ZERO':
     
      const newZeroState = {
        good: 0,
        ok : 0,
        bad : 0
      }
      state = newZeroState
      return state
    default: return state
  }
  
}

export default counterReducer