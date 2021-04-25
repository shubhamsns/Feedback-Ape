import {useRouter} from 'next/router'
import {Box} from '@chakra-ui/react'

import {getAllFeedback, getAllSites} from '@/lib/db-admin'

import {FeedbackLink} from '@/components/feedback-link'
import {Feedback} from '@/components/feedback'

export async function getStaticProps({params}) {
  const {siteId} = params
  const {feedback} = await getAllFeedback(siteId)

  return {
    props: {
      initialFeedback: feedback,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const {sites} = await getAllSites()

  const paths = sites.map(site => ({
    params: {
      siteId: site.id.toString(),
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

const EmbeddedFeedbackPage = ({initialFeedback}) => {
  const {query} = useRouter()

  return (
    <Box display="flex" flexDirection="column" width="full">
      <FeedbackLink paths={[query.siteId]} />

      {initialFeedback && initialFeedback.map(feedback => <Feedback key={feedback.id} {...feedback} />)}
    </Box>
  )
}

export default EmbeddedFeedbackPage
