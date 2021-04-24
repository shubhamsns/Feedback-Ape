import {
  Box,
  Avatar,
  Heading,
  Button,
  Text,
  Flex,
  Skeleton,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
} from '@chakra-ui/react'

import {useAuth} from '@/lib/auth'

import {DashboardShell} from '@/components/dashboard-shell'

function FeedbackUsage() {
  return (
    <StatGroup>
      <Stat>
        <StatLabel color="gray.700">Feedback</StatLabel>
        <StatNumber fontWeight="medium">∞</StatNumber>
        <StatHelpText>10,000 limit</StatHelpText>
      </Stat>

      <Stat>
        <StatLabel color="gray.700">Sites</StatLabel>
        <StatNumber fontWeight="medium">1/5</StatNumber>
        <StatHelpText>Unlimited Sites</StatHelpText>
      </Stat>
    </StatGroup>
  )
}

function SettingsTable({children}) {
  return (
    <Box backgroundColor="white" mt={8} borderRadius={[0, 8, 8]} boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)">
      <Flex
        backgroundColor="gray.50"
        borderTopLeftRadius={[0, 8, 8]}
        borderTopRightRadius={[0, 8, 8]}
        borderBottom="1px solid"
        borderBottomColor="gray.200"
        px={6}
        py={4}
      >
        <Flex justify="space-between" align="center" w="full">
          <Text textTransform="uppercase" fontSize="xs" color="gray.500" fontWeight="medium" mt={1}>
            Plan
          </Text>

          <Badge h="1rem" colorScheme="green">
            Premium
          </Badge>
        </Flex>
      </Flex>

      <Flex direction="column" p={6}>
        {children}
      </Flex>
    </Box>
  )
}

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
      <Flex direction="column" maxW="600px" align={['left', 'center']} margin="0 auto">
        <Flex direction="column" align={['left', 'center']} ml={4}>
          <Avatar w={['3rem', '6rem']} h={['3rem', '6rem']} mb={4} src={user?.photoUrl} />
          <Heading letterSpacing="-1px">{user?.name}</Heading>
          <Text>{user?.email}</Text>
        </Flex>

        <SettingsTable>
          <FeedbackUsage />

          <Text m={4}>Thanks for joining. you have a free premium plan.</Text>

          <Flex justify="flex-end">
            <Button variant="solid" ml={4} onClick={() => signout()}>
              Log Out
            </Button>
          </Flex>
        </SettingsTable>
      </Flex>
    </DashboardShell>
  )
}

function AccountPage() {
  return <MyAccount />
}

export default AccountPage
