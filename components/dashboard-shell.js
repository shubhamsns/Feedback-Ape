import {Box, Button, Flex, Link, Avatar} from '@chakra-ui/react'
import NextLink from 'next/link'

import {useAuth} from '@/lib/auth'
import {FastFeedbackLogo} from '@/assets/icons'

function DashboardShell({children}) {
  const {user, signout} = useAuth()

  return (
    <Box backgroundColor="gray.100" h="100vh">
      {/* Header */}
      <Box as="header" backgroundColor="white" mb={16} w="full">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          py={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
          h="4.5rem"
        >
          <Flex align="center">
            <NextLink href="/" passHref>
              <Link>
                <FastFeedbackLogo h="6" w="6" mr="8" />
              </Link>
            </NextLink>
            <NextLink href="/dashboard" passHref>
              <Link mr={4}>Sites</Link>
            </NextLink>
            <NextLink href="/feedback" passHref>
              <Link>Feedback</Link>
            </NextLink>
          </Flex>

          {user && (
            <Flex justifyContent="center" alignItems="center">
              <Button variant="ghost" mr={2} onClick={() => signout()}>
                Log Out
              </Button>

              <Avatar size="sm" name={user.name} src={user?.photoUrl} />
            </Flex>
          )}
        </Flex>
      </Box>

      {/* Main */}
      <Flex as="main" direction="column" margin="0 auto" maxW="1250px" px={8}>
        {children}
      </Flex>
    </Box>
  )
}

export {DashboardShell}
