import {db} from './firebase'

function createUser(uid, data) {
  return db
    .collection('users')
    .doc(uid)
    .set({uid, ...data}, {merge: true})
}

function createSite(data) {
  return db.collection('sites').add(data)
}

function createFeedback(data) {
  return db.collection('feedback').add(data)
}

function deleteFeedback(id) {
  return db.collection('feedback').doc(id).delete()
}

export {createUser, createSite, createFeedback, deleteFeedback}
