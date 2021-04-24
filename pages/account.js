import {Box, Avatar, Heading, Button, Text, Flex, Skeleton} from '@chakra-ui/react'

import {useAuth} from '@/lib/auth'

import {DashboardShell} from '@/components/dashboard-shell'

function MyAccount() {
  const {user, signout} = useAuth()

  if (!user) {
    return (
      <DashboardShell>
        <Flex mt={8} direction="column" justifyContent="center" alignItems="center" overflowY="auto">
          <Box w="full" textAlign="center" mb={6}>
            <Avatar w={['3rem', '6rem']} h={['3rem', '6rem']} />
          </Box>

          <Box mt={8} p={4} bg="white" borderRadius={8} w="full">
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Box>
        </Flex>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <Flex mt={8} direction="column" justifyContent="center" alignItems="center" overflowY="auto">
        <Box w="full" textAlign="center" mb={6}>
          <Avatar w={['3rem', '6rem']} h={['3rem', '6rem']} src={user.photoUrl} name={user.name} loading="eager" />
          <Heading letterSpacing="-1px" mt={2}>
            {user.name}
          </Heading>
          <Text>{user.email}</Text>
        </Box>

        <Flex justifyContent="center" align="center">
          <Button onClick={signout} colorScheme="red">
            Logout
          </Button>
        </Flex>
      </Flex>
    </DashboardShell>
  )
}

const AccountPage = () => <MyAccount />

export default AccountPage
