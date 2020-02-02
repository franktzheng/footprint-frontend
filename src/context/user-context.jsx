import React, { useContext, useState } from 'react'
import { signIn } from '../utils/request'

const UserContext = React.createContext({ user: null, setUser: null })

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const updateUser = async (id, name) => {
    if (!id) {
      id = user.fb_id
    }
    if (!name) {
      name = user.name
    }
    const updatedUser = await signIn(id, name)
    setUser(updatedUser)
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, token, setToken, updateUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const value = useContext(UserContext)
  return value
}
