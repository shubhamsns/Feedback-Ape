const title = 'Feedback Ape – The easiest way to add comments or reviews to your static site.'
const description = 'Feedback Ape helps you to integrate comments in your sites easily.'

const SEO = {
  title,
  description,
  canonical: 'https://fastfeedback.shubham-sns.vercel.app',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://fastfeedback.shubham-sns.vercel.app',
    title,
    description,
    images: [
      {
        url: 'https://fastfeedback.shubham-sns.vercel.app/og.png',
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
}

export {SEO}
