import {useRef} from 'react'
import {mutate} from 'swr'
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react'

import {useAuth} from '@/lib/auth'
import {deleteFeedback} from '@/lib/db'

import {DeleteIcon} from '@/assets/icons'

function DeleteFeedbackButton({feedbackId}) {
  const cancelRef = useRef()
  const {isOpen, onClose, onOpen} = useDisclosure()

  const {user} = useAuth()

  const onDelete = () => {
    deleteFeedback(feedbackId)

    mutate(
      ['/api/feedback', user.token],
      async data => ({
        feedback: data.feedback.filter(feedback => feedback.id !== feedbackId),
      }),
      false // no need to refetch the data
    )

    onClose()
  }

  return (
    <>
      <IconButton aria-label="delete feedback" variant="ghost" onClick={onOpen} icon={<DeleteIcon />} />

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Feedback
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export {DeleteFeedbackButton}
