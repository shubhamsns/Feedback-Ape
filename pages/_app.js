/* eslint-disable react/jsx-props-no-spreading */
import {ChakraProvider} from '@chakra-ui/react'

import {AuthProvider} from '@/lib/auth'
import {theme} from '@/styles/theme'

function App({Component, pageProps}) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
