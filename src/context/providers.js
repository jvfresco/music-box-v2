import React, {createContext, useState} from 'react'

export const ContextData = createContext()

const StateProvider = ({children}) => {
const [input, setInput ] = useState(null)

const store = [input, setInput]


  return (  
    <ContextData.Provider value={store}>
      {children}
    </ContextData.Provider>
  )
}

export default StateProvider