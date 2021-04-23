import Head from 'next/head'
import {Button, Heading, Text, Code} from '@chakra-ui/react'

import {useAuth} from '@/lib/auth'

function Home() {
  const auth = useAuth()

  return (
    <div>
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <main>
        <Heading>Fast Feedback</Heading>
        <Text>
          Current user: <Code>{auth.user ? auth.user.email : 'None'}</Code>
        </Text>
        {auth.user ? (
          <Button onClick={() => auth.signout()}>Sign Out</Button>
        ) : (
          <Button onClick={() => auth.signinWithGitHub()}>Sign In</Button>
        )}
      </main>
    </div>
  )
}

export default Home
