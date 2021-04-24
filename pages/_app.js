import {ChakraProvider} from '@chakra-ui/react'
import {DefaultSeo} from 'next-seo'

import Head from 'next/head'
import {AuthProvider} from '@/lib/auth'

import {theme} from '@/styles/theme'
import {SEO} from 'next-seo.config'

function App({Component, pageProps}) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>

      <ChakraProvider theme={theme} resetCSS>
        <AuthProvider>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </>
  )
}

export default App
