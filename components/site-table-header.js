import {Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading} from '@chakra-ui/react'

import {AddSiteModal} from './add-site-modal'

function SiteTableHeader() {
  return (
    <Box mx="4">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink>Sites</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex justifyContent="space-between">
        <Heading mb={8}>My Sites</Heading>

        <AddSiteModal>+ Add Site</AddSiteModal>
      </Flex>
    </Box>
  )
}

export {SiteTableHeader}
