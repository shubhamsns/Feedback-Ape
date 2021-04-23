import React from 'react'
import {Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Button, Flex, Link, Avatar} from '@chakra-ui/react'

import {useAuth} from '@/lib/auth'
import {FastFeedbackLogo} from '@/assets/icons'
import {AddSiteModal} from './add-site-modal'

function DashboardShell({children}) {
  const {user, signout} = useAuth()

  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Flex backgroundColor="white" mb={16} w="full">
        <Flex alignItems="center" justifyContent="space-between" py={4} maxW="1250px" margin="0 auto" w="full" px={8}>
          <Flex>
            <FastFeedbackLogo h="6" w="6" mr="8" />
            <Link mr={4}>Sites</Link>
            <Link>Feedback</Link>
          </Flex>

          <Flex justifyContent="center" alignItems="center">
            {user && (
              <Button variant="ghost" mr={2} onClick={() => signout()}>
                Log Out
              </Button>
            )}

            <Avatar size="sm" src={user?.photoUrl} />
          </Flex>
        </Flex>
      </Flex>

      <Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>Sites</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Flex justifyContent="space-between">
          <Heading mb={8}>My Sites</Heading>

          <AddSiteModal>+ Add Site</AddSiteModal>
        </Flex>

        {children}
      </Flex>
    </Box>
  )
}

export {DashboardShell}
