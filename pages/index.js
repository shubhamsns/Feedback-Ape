/* eslint-disable react/no-danger */
import Head from 'next/head'
import Link from 'next/link'
import {Box, Button, Flex, Text} from '@chakra-ui/react'
import IframeResizer from 'iframe-resizer-react'

import {useAuth} from '@/lib/auth'

import {LoginButtons} from '@/components/login-buttons'

function Home() {
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

          <Text fontSize="40">🐵</Text>

          <Text mb={4} fontSize="lg">
            <Text as="span" fontWeight="bold">
              Feedback Ape{` `}
            </Text>
            is the easiest way to add comments or reviews to your static site. Try it out by leaving a comment below.
            After the comment is approved, it will display below.
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

      <Text
        my="4"
        backgroundColor="#99FFFE"
        color="#194D4C"
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center"
        maxWidth="700px"
        p={4}
        rounded="md"
        mx="auto"
      >
        This is Our Feedback Integration in Action!
      </Text>

      <Box
        as={IframeResizer}
        checkOrigin={false}
        title="Comments"
        src="https://feedbackape.vercel.app/embed/3BGPAcdMV7EFeLO9A9Yj"
        maxWidth="700px"
        w="full"
        margin="0 auto"
        px={4}
        mt={8}
      />
    </>
  )
}
export default Home
