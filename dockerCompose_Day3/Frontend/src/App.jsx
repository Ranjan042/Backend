import React from 'react'
import { useEffect , useState } from 'react'

const App = () => {

  const [users, setusers] = useState([])

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3000/users")
    const data = await response.json()
    setusers(data)
  }
  useEffect(() => {
    fetchUsers();
  },[])
  return (
    <div>
      <h1>Hello Users Changes are not syncing live</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App