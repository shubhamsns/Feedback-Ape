import {useState, useEffect, useContext, createContext} from 'react'

import firebase from './firebase'
import {createUser} from './db'

const formatUser = user => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  provider: user.providerData[0].providerId,
  photoUrl: user.photoURL,
})

function useProvideAuth() {
  const [user, setUser] = useState(null)

  const handleUser = rawUser => {
    if (rawUser) {
      const user = formatUser(rawUser)

      createUser(user.uid, user)
      setUser(user)
      return user
    }
    setUser(false)
    return false
  }

  const signinWithGitHub = () =>
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(response => handleUser(response.user))

  const signout = () =>
    firebase
      .auth()
      .signOut()
      .then(() => handleUser(false))

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser)

    return () => unsubscribe()
  }, [])

  return {
    user,
    signinWithGitHub,
    signout,
  }
}

const authContext = createContext()

function AuthProvider({children}) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

const useAuth = () => useContext(authContext)

export {AuthProvider, useAuth}
