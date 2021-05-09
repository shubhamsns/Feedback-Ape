import React from 'react'
import {NextSeo} from 'next-seo'

const Page = ({name, path, children}) => {
  const title = `Feedback Ape – ${name}`
  const url = `https://feedbackape.vercel.app/${path}`

  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title,
        }}
      />
      {children}
    </>
  )
}

export {Page}
