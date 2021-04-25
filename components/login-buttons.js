import {Button, Stack} from '@chakra-ui/react'

import {useAuth} from '@/lib/auth'
import {GithubIcon, GoogleSvgIcon} from '@/assets/icons'

function LoginButtons() {
  const auth = useAuth()

  return (
    <Stack direction={['column', 'row']}>
      <Button
        onClick={() => auth.signinWithGitHub()}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        leftIcon={<GithubIcon />}
        _hover={{bg: 'gray.700'}}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
      >
        Continue with GitHub
      </Button>

      <Button
        onClick={() => auth.signinWithGoogle()}
        backgroundColor="white"
        color="gray.900"
        variant="outline"
        fontWeight="medium"
        leftIcon={<GoogleSvgIcon />}
        _hover={{bg: 'gray.100'}}
        _active={{
          bg: 'gray.100',
          transform: 'scale(0.95)',
        }}
      >
        Continue with Google
      </Button>
    </Stack>
  )
}

export {LoginButtons}
