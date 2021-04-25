/* eslint-disable react/no-danger */
import Head from 'next/head'
import Link from 'next/link'
import {Box, Button, Flex, Text} from '@chakra-ui/react'

import {useAuth} from '@/lib/auth'
import {getAllFeedback, getSite} from '@/lib/db-admin'
import {FastFeedbackLogo} from '@/assets/icons'

import {LoginButtons} from '@/components/login-buttons'
import {FeedbackLink} from '@/components/feedback-link'
import {Feedback} from '@/components/feedback'

const SITE_ID = process.env.NEXT_PUBLIC_HOME_PAGE_SITE_ID

export async function getStaticProps() {
  const {feedback} = await getAllFeedback(SITE_ID)
  const {site} = await getSite(SITE_ID)

  return {
    props: {
      allFeedback: feedback,
      site,
    },
    revalidate: 1,
  }
}

function Home({allFeedback, site}) {
  const auth = useAuth()

  return (
    <>
      <Box bg="gray.100" py={16} px={4}>
        <Flex as="main" direction="column" maxW="700px" margin="0 auto">
          <Head>
            {/* https://vercel.com/blog/simple-auth-with-magic-link-and-nextjs#handling-unwanted-page-transitions */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
              if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                window.location.href = "/sites"
              }
            `,
              }}
            />
          </Head>

          <FastFeedbackLogo h="16" w="16" mb="2" color="black" />

          <Text mb={4} fontSize="lg">
            <Text as="span" fontWeight="bold">
              Fast Feedback{` `}
            </Text>
            is the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you
            can try it out by logging in.
          </Text>

          {auth.user ? (
            <Link href="/sites" passHref>
              <Button
                as="a"
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                maxW="200px"
                _hover={{bg: 'gray.700'}}
                _active={{
                  bg: 'gray.800',
                  transform: 'scale(0.95)',
                }}
              >
                View Dashboard
              </Button>
            </Link>
          ) : (
            <LoginButtons />
          )}
        </Flex>
      </Box>

      <Box display="flex" flexDirection="column" width="full" maxWidth="700px" margin="0 auto" px={4} mt={8}>
        <FeedbackLink paths={[SITE_ID]} />

        {allFeedback.map((feedback, index) => (
          <Feedback
            key={feedback.id}
            settings={site?.settings}
            isLast={index === allFeedback.length - 1}
            {...feedback}
          />
        ))}
      </Box>
    </>
  )
}
export default Home
