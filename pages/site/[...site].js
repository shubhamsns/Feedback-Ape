import {Box, FormControl, Textarea, Button} from '@chakra-ui/react'
import useSWR, {mutate} from 'swr'
import {useForm} from 'react-hook-form'
import {useRouter} from 'next/router'

import {fetcher} from '@/utils/fetcher'
import {createFeedback} from '@/lib/db'
import {useAuth} from '@/lib/auth'

import {LoginButtons} from '@/components/login-buttons'
import {DashboardShell} from '@/components/dashboard-shell'
import {SiteHeader} from '@/components/site-header'
import {Feedback} from '@/components/feedback'

function FeedbackPage() {
  const {user, loading} = useAuth()
  const router = useRouter()
  const {handleSubmit, register} = useForm()

  const siteAndRoute = router.query?.site
  const siteId = siteAndRoute ? siteAndRoute[0] : null
  const route = siteAndRoute ? siteAndRoute.slice(1).join(' / ') : null

  const feedbackApi = route ? `/api/feedback/${siteId}/${route}` : `/api/feedback/${siteId}`

  const {data: siteData} = useSWR(`/api/site/${siteId}`, fetcher)
  const {data: feedbackData} = useSWR(feedbackApi, fetcher)

  const site = siteData?.site
  const allFeedback = feedbackData?.feedback

  const onSubmit = ({text}) => {
    const newFeedback = {
      siteId,
      route: route || '/',
      author: user.name,
      authorId: user.uid,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'pending',
      text,
    }

    mutate(
      feedbackApi,
      async data => ({
        feedback: [newFeedback, ...data.feedback],
      }),
      false
    )
    createFeedback(newFeedback)
  }

  const LoginOrLeaveFeedback = () =>
    user ? (
      <Button
        type="submit"
        isDisabled={!siteData || !feedbackData}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        mt={4}
        _hover={{bg: 'gray.700'}}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
      >
        Leave Feedback
      </Button>
    ) : (
      <LoginButtons />
    )

  return (
    <DashboardShell>
      <SiteHeader isSiteOwner={site?.authorId === user?.uid} site={site} siteId={siteId} route={route} />

      <Box display="flex" mx={4} flexDirection="column" width="full" maxWidth="700px">
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={8}>
            <Textarea
              bg="white"
              id="comment"
              placeholder="Leave a comment"
              h="100px"
              {...register('text', {required: true})}
            />
            {!loading && <LoginOrLeaveFeedback />}
          </FormControl>
        </Box>

        {allFeedback &&
          allFeedback.map((feedback, index) => (
            <Feedback
              key={feedback.id}
              settings={site?.settings}
              isLast={index === allFeedback.length - 1}
              {...feedback}
            />
          ))}
      </Box>
    </DashboardShell>
  )
}

export default FeedbackPage
