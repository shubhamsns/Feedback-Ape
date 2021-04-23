import firebase from './firebase'

const firestore = firebase.firestore()

function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({uid, ...data}, {merge: true})
}

function createSite(data) {
  return firestore.collection('sites').add(data)
}

export {createUser, createSite}
