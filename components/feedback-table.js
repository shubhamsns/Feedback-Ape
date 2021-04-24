import {Box, Code, Switch} from '@chakra-ui/react'

import {Table, Tr, Th, Td} from './table'
import {DeleteFeedbackButton} from './delete-feedback-button'

function FeedbackTable({allFeedback}) {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Tr />
        </Tr>
      </thead>

      <tbody>
        {allFeedback.map(feedback => (
          <Box as="tr" key={feedback.id}>
            <Td fontWeight="medium">{feedback.author}</Td>
            <Td>{feedback.text}</Td>
            <Td>
              <Code>{feedback.route || '/'}</Code>
            </Td>
            <Td>
              <Switch defaultChecked={feedback.status === 'active'} colorScheme="green" />
            </Td>
            <Td>
              <DeleteFeedbackButton feedbackId={feedback.id} />
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  )
}

export {FeedbackTable}
