import {compareDesc, parseISO} from 'date-fns'

import {dbAdmin} from './firebase-admin'

async function getAllFeedback(siteId, route) {
  try {
    let ref = await dbAdmin.collection('feedback').where('siteId', '==', siteId).where('status', '==', 'active')

    if (route) {
      ref = ref.where('route', '==', route)
    }

    const snapshot = await ref.get()

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

async function getSite(siteId) {
  const doc = await dbAdmin.collection('sites').doc(siteId).get()
  const site = {id: doc.id, ...doc.data()}

  return {site}
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

  sites.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)))

  return {sites}
}

async function getAllFeedbackForSites(uid) {
  const {sites} = await getUserSites(uid)
  const siteIds = sites.map(site => site.id)
  const snapshot = await dbAdmin.collection('feedback').where('siteId', 'in', siteIds).get()

  const feedback = []

  snapshot.forEach(doc => {
    feedback.push({id: doc.id, ...doc.data()})
  })
  return {feedback}
}

export {getAllFeedback, getAllSites, getUserSites, getAllFeedbackForSites, getSite}
