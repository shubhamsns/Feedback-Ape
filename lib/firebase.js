import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  })
}

const auth = firebase.auth()
const db = firebase.firestore()

const githubAuthProvider = new firebase.auth.GithubAuthProvider()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {auth, db, githubAuthProvider, googleAuthProvider}
