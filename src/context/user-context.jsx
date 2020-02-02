import React, { useContext, useState } from 'react'

const UserContext = React.createContext({ user: null, setUser: null })

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const value = useContext(UserContext)
  return value
}
