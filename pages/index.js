/* eslint-disable react/no-danger */
import Head from 'next/head'
import Link from 'next/link'
import {Button, Flex, Stack, Text} from '@chakra-ui/react'

import {useAuth} from '@/lib/auth'

import {FastFeedbackLogo, GithubIcon, GoogleSvgIcon} from '@/assets/icons'

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

      <Text mb={4} fontSize="lg" p={6}>
        <Text as="span" fontWeight="bold">
          Fast Feedback{` `}
        </Text>
        is the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can
        try it out by logging in.
      </Text>

      {auth.user ? (
        <Link href="/dashboard" passHref>
          <Button
            as="a"
            backgroundColor="white"
            color="gray.900"
            variant="outline"
            fontWeight="medium"
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
        <Stack>
          <Button
            onClick={() => auth.signinWithGitHub()}
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            mt={4}
            size="lg"
            leftIcon={<GithubIcon />}
            _hover={{bg: 'gray.700'}}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)',
            }}
          >
            Sign In with GitHub
          </Button>

          <Button
            onClick={() => auth.signinWithGoogle()}
            backgroundColor="white"
            color="gray.900"
            variant="outline"
            fontWeight="medium"
            leftIcon={<GoogleSvgIcon />}
            mt={4}
            size="lg"
            _hover={{bg: 'gray.100'}}
            _active={{
              bg: 'gray.100',
              transform: 'scale(0.95)',
            }}
          >
            Sign In with Google
          </Button>
        </Stack>
      )}
    </Flex>
  )
}
export default Home
