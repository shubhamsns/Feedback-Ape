import {useRef} from 'react'
import {mutate} from 'swr'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'

import {deleteSite} from '@/lib/db'
import {useAuth} from '@/lib/auth'
import {DeleteIcon} from '@/assets/icons'

function DeleteSiteButton({siteId}) {
  const {onOpen, onClose, isOpen} = useDisclosure()
  const cancelRef = useRef()
  const auth = useAuth()

  const onDelete = () => {
    deleteSite(siteId)
    mutate(
      ['/api/sites', auth.user.token],
      async data => ({
        sites: data.sites.filter(site => site.id !== siteId),
      }),
      false
    )
    onClose()
  }

  return (
    <>
      <IconButton aria-label="Delete site" icon={<DeleteIcon />} variant="ghost" onClick={onOpen} />

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Site
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure?This will also delete all feedback left on the site.You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>

            <Button fontWeight="bold" colorScheme="red" onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export {DeleteSiteButton}
