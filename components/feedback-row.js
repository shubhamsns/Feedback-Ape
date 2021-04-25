import {Box, Code, Switch} from '@chakra-ui/react'

import {updateFeedback} from '@/lib/db'

import {Td} from './table'
import {DeleteFeedbackButton} from './delete-feedback-button'

function FeedbackRow({id, author, text, route, status}) {
  const toggleFeedback = e => {
    const {checked} = e.target
    updateFeedback(id, {status: checked ? 'active' : 'pending'})
  }

  return (
    <Box as="tr">
      <Td fontWeight="medium">{author}</Td>
      <Td>{text}</Td>
      <Td>
        <Code maxW="150px" textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden" display="inherit">
          {route || '/'}
        </Code>
      </Td>
      <Td>
        <Switch color="green" onChange={toggleFeedback} defaultChecked={status === 'active'} />
      </Td>
      <Td>
        <DeleteFeedbackButton feedbackId={id} />
      </Td>
    </Box>
  )
}

export {FeedbackRow}
