import { useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector(state => {return state.notifications.notification})
  const print = 'You voted  \'' +  String(notification) + '\''
  console.log('notification', notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {print}
    </div>
  )
}

export default Notification