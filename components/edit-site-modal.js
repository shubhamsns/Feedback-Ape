import {useForm} from 'react-hook-form'
import {mutate} from 'swr'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Button,
  Switch,
  useToast,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

import {updateSite} from '@/lib/db'
import {useAuth} from '@/lib/auth'
import {SettingIcons} from '@/assets/icons'

function EditSiteModal({settings, siteId, children}) {
  const toast = useToast()
  const {user} = useAuth()
  const {isOpen, onOpen, onClose} = useDisclosure()

  console.log(settings)

  const {handleSubmit, register} = useForm({
    defaultValues: settings,
  })

  const onUpdateSite = async newSettings => {
    await updateSite(siteId, {
      settings: newSettings,
    }).then(() => {
      // invalidate
      mutate(['/api/sites', user.token])

      toast({
        title: 'Success!',
        description: "We've updated your site.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      onClose()
    })
  }

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        leftIcon={<SettingIcons h="6" w="6" fill="none" stroke="currentColor" />}
        _hover={{bg: 'gray.700'}}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
      >
        {children}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onUpdateSite)}>
          <ModalHeader fontWeight="bold">Edit Site</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <VStack spacing="4">
              <FormControl>
                <Switch {...register('timestamp')}>Show Timestamp</Switch>
              </FormControl>

              <FormControl>
                <Switch {...register('icons')}>Show Icon</Switch>
              </FormControl>

              <FormControl>
                <Switch {...register('ratings')}>Show Ratings</Switch>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button backgroundColor="#99FFFE" color="#194D4C" fontWeight="medium" type="submit">
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export {EditSiteModal}
