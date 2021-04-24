import {useState, useEffect, useContext, createContext} from 'react'
import Router from 'next/router'
import cookie from 'js-cookie'

import {auth, githubAuthProvider, googleAuthProvider} from './firebase'
import {createUser} from './db'

const formatUser = async user => {
  const token = await user.getIdToken()
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token,
  }
}

function useProvideAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleUser = async rawUser => {
    if (rawUser) {
      const user = await formatUser(rawUser)
      const {token, ...userWithoutToken} = user

      createUser(user.uid, userWithoutToken)
      setUser(user)

      cookie.set('fast-feedback-auth', true, {
        expires: 1,
      })

      setLoading(false)
      return user
    }
    setUser(false)
    cookie.remove('fast-feedback-auth')

    setLoading(false)
    return false
  }

  const signinWithGitHub = redirect => {
    setLoading(true)
    return auth.signInWithPopup(githubAuthProvider).then(response => {
      handleUser(response.user)

      if (redirect) {
        Router.push(redirect)
      }
    })
  }

  const signout = () => {
    Router.push('/')

    return auth.signOut().then(() => handleUser(false))
  }

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(handleUser)

    return () => unsubscribe()
  }, [])

  return {
    user,
    loading,
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
