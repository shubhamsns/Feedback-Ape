import {Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading} from '@chakra-ui/react'

function FeedbackTableHeader() {
  return (
    <Box mx="4">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink>Feedback</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex justifyContent="space-between">
        <Heading mb={8}>My Feedback</Heading>
      </Flex>
    </Box>
  )
}

export {FeedbackTableHeader}
