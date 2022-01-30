import { createContext } from 'react'

const Authcontext = createContext({
    isLoggedIn: false,
    onLogout: () => { },
})

export default Authcontext