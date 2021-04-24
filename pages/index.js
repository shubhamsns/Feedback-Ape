/* eslint-disable react/no-danger */
import Head from 'next/head'
import Link from 'next/link'
import {Box, Button, Flex, HStack, Text} from '@chakra-ui/react'

import {useAuth} from '@/lib/auth'
import {getAllFeedback} from '@/lib/db-admin'

import {FastFeedbackLogo, GithubIcon, GoogleSvgIcon} from '@/assets/icons'
import {Feedback} from '@/components/feedback'
import {FeedbackLink} from '@/components/feedback-link'

const SITE_ID = process.env.NEXT_PUBLIC_HOME_PAGE_SITE_ID

export async function getStaticProps() {
  const {feedback} = await getAllFeedback(SITE_ID)

  return {
    props: {
      allFeedback: feedback,
    },
    revalidate: 1,
  }
}

function Home({allFeedback}) {
  const auth = useAuth()

  return (
    <>
      <Box bg="gray.100" py={16}>
        <Flex as="main" direction="column" maxW="700px" margin="0 auto">
          <Head>
            {/* https://vercel.com/blog/simple-auth-with-magic-link-and-nextjs#handling-unwanted-page-transitions */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
              if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                window.location.href = "/dashboard"
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
            <Link href="/dashboard" passHref>
              <Button
                as="a"
                backgroundColor="white"
                color="gray.900"
                variant="outline"
                fontWeight="medium"
                maxW="200px"
                mt={4}
                size="lg"
                _hover={{bg: 'gray.100'}}
                _active={{
                  bg: 'gray.100',
                  transform: 'scale(0.95)',
                }}
              >
                View Dashboard
              </Button>
            </Link>
          ) : (
            <HStack mt="4">
              <Button
                onClick={() => auth.signinWithGitHub()}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                leftIcon={<GithubIcon />}
                _hover={{bg: 'gray.700'}}
                _active={{
                  bg: 'gray.800',
                  transform: 'scale(0.95)',
                }}
              >
                Continue with GitHub
              </Button>

              <Button
                onClick={() => auth.signinWithGoogle()}
                backgroundColor="white"
                color="gray.900"
                variant="outline"
                fontWeight="medium"
                leftIcon={<GoogleSvgIcon />}
                _hover={{bg: 'gray.100'}}
                _active={{
                  bg: 'gray.100',
                  transform: 'scale(0.95)',
                }}
              >
                Continue with Google
              </Button>
            </HStack>
          )}
        </Flex>
      </Box>
      <Box display="flex" flexDirection="column" width="full" maxWidth="700px" margin="0 auto" mt={8}>
        <FeedbackLink siteId={SITE_ID} />
        {allFeedback.map(feedback => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Box>
    </>
  )
}
export default Home
