/* eslint-disable react/jsx-props-no-spreading */
import {ProvideAuth} from '../lib/auth'

function MyApp({Component, pageProps}) {
  return (
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
  )
}

export default MyApp
