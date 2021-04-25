import {db} from './firebase'

function createUser(uid, data) {
  return db
    .collection('users')
    .doc(uid)
    .set({uid, ...data}, {merge: true})
}

function createSite(data) {
  const ref = db.collection('sites').doc()
  ref.set(data)
  return ref
}

function createFeedback(data) {
  return db.collection('feedback').add(data)
}

function deleteFeedback(id) {
  return db.collection('feedback').doc(id).update({status: 'removed'})
}

function updateFeedback(id, newValues) {
  return db.collection('feedback').doc(id).update(newValues)
}

async function updateSite(id, newValues) {
  return db.collection('sites').doc(id).update(newValues)
}

async function deleteSite(id) {
  db.collection('sites').doc(id).delete()
  const snapshot = await db.collection('feedback').where('siteId', '==', id).get()

  const batch = db.batch()

  snapshot.forEach(doc => {
    batch.delete(doc.ref)
  })

  return batch.commit()
}

export {createUser, createSite, createFeedback, deleteFeedback, updateFeedback, updateSite, deleteSite}
