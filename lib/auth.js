import React, {useState, useEffect, useContext, createContext, useMemo, useCallback} from 'react'
import firebase from './firebase'

function useProvideAuth() {
  const [user, setUser] = useState(null)

  const signinWithGithub = useCallback(
    () =>
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GithubAuthProvider())
        .then(response => {
          setUser(response.user)
          return response.user
        }),
    []
  )

  const signout = useCallback(
    () => () =>
      firebase
        .auth()
        .signOut()
        .then(() => {
          setUser(false)
        }),

    []
  )

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        setUser(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return {
    user,
    signinWithGithub,
    signout,
  }
}

const authContext = createContext()

function ProvideAuth({children}) {
  const auth = useProvideAuth()

  const value = useMemo(() => auth, [auth])

  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

const useAuth = () => useContext(authContext)

export {ProvideAuth, useAuth}
