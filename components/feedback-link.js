import {Flex, Link} from '@chakra-ui/react'

function FeedbackLink({paths}) {
  return (
    <Flex justifyContent="space-between" mb={8} width="full" mt={1}>
      <Link fontWeight="bold" fontSize="sm" href={`/site/${paths.join('/')}`} target="_blank">
        Leave a comment →
      </Link>

      <Link fontSize="xs" color="blackAlpha.500" href="/">
        Powered by Fast Feedback
      </Link>
    </Flex>
  )
}

export {FeedbackLink}
