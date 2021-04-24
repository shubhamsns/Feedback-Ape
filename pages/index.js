/* eslint-disable react/no-danger */
import Head from 'next/head'
import {Button, Flex, Text} from '@chakra-ui/react'

import {useAuth} from '@/lib/auth'
import {FastFeedbackLogo} from '@/assets/icons'

function Home() {
  const auth = useAuth()

  return (
    <Flex as="main" direction="column" align="center" justify="center" h="100vh" maxW="400px" margin="0 auto">
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
        <title>Fast Feedback</title>
      </Head>

      <FastFeedbackLogo h="42px" w="42px" mb="2" color="black" />

      <Text mb={4}>
        <Text as="span" fontWeight="bold" display="inline">
          Fast Feedback {` `}
        </Text>
        is the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can
        try it out by logging in.
      </Text>
      {auth.user ? (
        <Button as="a" size="sm" fontWeight="medium" href="/dashboard">
          View Dashboard
        </Button>
      ) : (
        <Button mt={4} size="sm" fontWeight="medium" onClick={() => auth.signinWithGitHub()}>
          Sign In
        </Button>
      )}
    </Flex>
  )
}
export default Home
