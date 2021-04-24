import {authAdmin} from '@/lib/firebase-admin'
import {getUserFeedback} from '@/lib/db-admin'

export default async (req, res) => {
  try {
    const {uid} = await authAdmin.verifyIdToken(req.headers.token)
    const {feedback} = await getUserFeedback(uid)

    res.status(200).json({feedback})
  } catch (error) {
    console.log(error)

    res.status(500).json({error})
  }
}
