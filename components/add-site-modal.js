import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'

import {createSite} from '@/lib/db'
import {useAuth} from '@/lib/auth'

function AddSiteModal() {
  const toast = useToast()
  const auth = useAuth()

  const {isOpen, onOpen, onClose} = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)

  const {
    handleSubmit,
    register,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      site: '',
      url: '',
    },
  })

  const onCreateSite = async ({site, url}) => {
    setIsLoading(true)

    await createSite({
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      site,
      url,
    })
      .then(() => {
        toast({
          status: 'success',
          title: 'Success',
          description: "We've added your site.",
          isClosable: true,
          position: 'top',
        })
        reset()
        onClose()
      })
      .catch(e => console.log(e))

    setIsLoading(false)
  }

  return (
    <>
      <Button fontWeight="medium" maxW="200px" onClick={onOpen}>
        Add Your First Site
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>

          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                autoFocus
                placeholder="My site"
                {...register('site', {required: {value: true, message: 'Required'}})}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://website.com"
                {...register('url', {required: {value: true, message: 'Required'}})}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>

            <Button
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
              loadingText="Loading..."
              isLoading={isLoading}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export {AddSiteModal}
