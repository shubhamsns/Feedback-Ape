import {Box} from '@chakra-ui/layout'

import {Table, Tr, Th} from './table'
import {FeedbackRow} from './feedback-row'

function FeedbackTable({allFeedback}) {
  return (
    <Box mb="20" overflowX="auto">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Feedback</Th>
            <Th>Route</Th>
            <Th>Visible</Th>
            <Th />
          </Tr>
        </thead>

        <tbody>
          {allFeedback.map(feedback => (
            <FeedbackRow key={feedback.id} {...feedback} />
          ))}
        </tbody>
      </Table>
    </Box>
  )
}

export {FeedbackTable}
