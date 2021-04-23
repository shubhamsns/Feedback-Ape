import React from 'react'
import {Heading, Text, Button, VStack} from '@chakra-ui/react'

import {DashboardShell} from './dashboard-shell'

function FreePlanEmptyState() {
  return (
    <DashboardShell>
      <VStack spacing={4} width="100%" backgroundColor="white" borderRadius="8px" p={8}>
        <Heading size="md">Get feedback on your site instantly.</Heading>
        <Text>Start today, then grow with us 🌱</Text>
        <Button>Upgrade to Starter</Button>
      </VStack>
    </DashboardShell>
  )
}

export {FreePlanEmptyState}
