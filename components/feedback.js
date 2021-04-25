import {Box, Heading, Text, Divider, HStack} from '@chakra-ui/react'
import {format, parseISO} from 'date-fns'

import {GithubIcon, GoogleSvgIcon} from '@/assets/icons'

function Feedback({author, text, createdAt, provider, isLast, settings}) {
  return (
    <Box borderRadius={4} maxWidth="700px" w="full">
      <HStack>
        <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
          {author}
        </Heading>
        {settings?.icons && (provider.slice(0, -4) === 'google' ? <GoogleSvgIcon /> : <GithubIcon />)}
      </HStack>

      {settings?.timestamp && (
        <Text color="gray.500" mb={4} fontSize="xs">
          {format(parseISO(createdAt), 'PPpp')}
        </Text>
      )}

      <Text color="gray.800">{text}</Text>

      {!isLast && <Divider borderColor="gray.200" backgroundColor="gray.200" mt={6} mb={6} />}
    </Box>
  )
}

export {Feedback}
