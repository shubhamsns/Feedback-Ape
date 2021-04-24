import {useState} from 'react'
import {mutate} from 'swr'
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

function AddSiteModal({children}) {
  const toast = useToast()
  const auth = useAuth()

  const {isOpen, onOpen, onClose} = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)

  const {
    handleSubmit,
    register,
    reset,
    // todo : show errors in form
    // formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      url: '',
    },
  })

  const onCreateSite = async ({name, url}) => {
    setIsLoading(true)

    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
    }

    const {id} = await createSite(newSite)

    toast({
      status: 'success',
      title: 'Success',
      description: "We've added your site.",
      isClosable: true,
      position: 'top',
    })
    reset()
    onClose()

    // optimistic update for better ux
    mutate(['/api/sites', auth.user.token], async data => ({sites: [{...newSite, id}, ...data.sites]}), false)

    setIsLoading(false)
  }

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{bg: 'gray.700'}}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
      >
        {children}
      </Button>

      <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
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
                {...register('name', {required: {value: true, message: 'Required'}})}
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
