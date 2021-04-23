import {useState, useEffect, useContext, createContext, useCallback, useMemo} from 'react'

import firebase from './firebase'
import {createUser} from './db'

const auth = firebase.auth()
const githubAuthProvider = new firebase.auth.GithubAuthProvider()

const formatUser = user => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  provider: user.providerData[0].providerId,
  photoUrl: user.photoURL,
})

function useProvideAuth() {
  const [user, setUser] = useState(null)

  const handleUser = useCallback(rawUser => {
    if (rawUser) {
      const user = formatUser(rawUser)

      createUser(user.uid, user)
      setUser(user)
      return user
    }

    setUser(false)
    return false
  }, [])

  const signinWithGitHub = useCallback(
    () => auth.signInWithPopup(githubAuthProvider).then(response => handleUser(response.user)),
    [handleUser]
  )

  const signout = useCallback(() => auth.signOut().then(() => handleUser(false)), [handleUser])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(handleUser)

    return () => unsubscribe()
  }, [handleUser])

  return {
    user,
    signinWithGitHub,
    signout,
  }
}

const authContext = createContext()

function AuthProvider({children}) {
  const auth = useProvideAuth()
  const value = useMemo(() => auth, [auth])

  return <authContext.Provider value={value}>{children}</authContext.Provider>
}

function useAuth() {
  const context = useContext(authContext)

  if (context === undefined) {
    throw new Error(`useAuth must be used within AuthProvider`)
  }

  return context
}

export {AuthProvider, useAuth}
