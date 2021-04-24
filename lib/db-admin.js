import {compareDesc, parseISO} from 'date-fns'

import {dbAdmin} from './firebase-admin'

async function getAllFeedback(siteId) {
  try {
    const snapshot = await dbAdmin.collection('feedback').where('siteId', '==', siteId).get()

    const feedback = []

    snapshot.forEach(doc => {
      feedback.push({id: doc.id, ...doc.data()})
    })

    feedback.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)))

    return {feedback}
  } catch (error) {
    return {error}
  }
}

// to create static pages for all available sites
async function getAllSites() {
  try {
    const snapshot = await dbAdmin.collection('sites').get()
    const sites = []

    snapshot.forEach(doc => {
      sites.push({id: doc.id, ...doc.data()})
    })

    return {sites}
  } catch (error) {
    return {error}
  }
}

async function getUserSites(uid) {
  const snapshot = await dbAdmin.collection('sites').where('authorId', '==', uid).get()

  const sites = []

  snapshot.forEach(doc => {
    sites.push({id: doc.id, ...doc.data()})
  })

  return {sites}
}

async function getUserFeedback(uid) {
  const snapshot = await dbAdmin.collection('feedback').where('authorId', '==', uid).get()

  const feedback = []

  snapshot.forEach(doc => {
    feedback.push({id: doc.id, ...doc.data()})
  })

  return {feedback}
}

export {getAllFeedback, getAllSites, getUserSites, getUserFeedback}
