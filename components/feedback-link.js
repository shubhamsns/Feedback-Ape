import {Flex, Link} from '@chakra-ui/react'

function FeedbackLink({paths}) {
  return (
    <Flex
      align={['flex-start', 'center']}
      justifyContent="space-between"
      mb={8}
      width="full"
      mt={1}
      direction={['column', 'row']}
    >
      <Link fontWeight="bold" fontSize="sm" href={`/site/${paths?.join('/')}`} target="_blank">
        Leave a comment →
      </Link>
      <Link fontSize="xs" color="blackAlpha.500" href="/" target="_blank">
        Powered by Feedback Ape
      </Link>
    </Flex>
  )
}

export {FeedbackLink}
