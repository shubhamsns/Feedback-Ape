import {Heading, Flex, Text} from '@chakra-ui/react'

function FeedbackEmptyState() {
  return (
    <Flex
      width="100%"
      backgroundColor="white"
      borderRadius="8px"
      p={16}
      justify="center"
      align="center"
      direction="column"
    >
      <Heading size="lg" mb={2}>
        There isn't any feedback.
      </Heading>

      <Text mb={4}>Share your sites!</Text>
    </Flex>
  )
}

export {FeedbackEmptyState}
