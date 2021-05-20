import NextLink from 'next/link'
import {Box, Button, Flex, Link, Avatar} from '@chakra-ui/react'

import {useAuth} from '@/lib/auth'
import {FastFeedbackLogo} from '@/assets/icons'

import {GithubCorner} from './github-corner'

function DashboardShell({children}) {
  const {user} = useAuth()

  return (
    <Box backgroundColor="gray.100" minH="100vh">
      {/* Header */}
      <Flex backgroundColor="white" mb={[8, 16]} w="full" borderTop="5px solid #0AF5F4">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          py={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
          h="16"
        >
          <Flex align="center">
            <FastFeedbackLogo h="6" w="6" mr="8" />

            <NextLink href="/sites" passHref>
              <Link mr={4}>Sites</Link>
            </NextLink>
            <NextLink href="/feedback" passHref>
              <Link>Feedback</Link>
            </NextLink>
          </Flex>

          {user && (
            <Flex justifyContent="center" alignItems="center">
              <NextLink href="/account" passHref>
                <Button as="a" variant="ghost" mr={2}>
                  Account
                </Button>
              </NextLink>

              <Avatar size="sm" name={user.name} src={user?.photoUrl} />
            </Flex>
          )}
        </Flex>

        <GithubCorner />
      </Flex>

      {/* Main */}
      <Flex as="main" direction="column" margin="0 auto" maxW="1250px" px={[0, 8, 8]}>
        {children}
      </Flex>
    </Box>
  )
}

export {DashboardShell}
