# Feedback Ape


> Easily add user reviews, feedback, and comments to your website in one line of code.

<div align="center">

[![feedback-ape-home.png](https://i.postimg.cc/MTmYFtMP/feedback-ape-home.png)](feedback-ape-integrated-with-iframe-on-page)

### Feedback Ape 🐵

</div>


Demo live at: [Feedback Ape 🐵](https://feedbackape.vercel.app)

## Features
* Authentication for adding comments and using app
* Add sites on which you want feedback
* integrate Feedback Ape to your app with one line of code
* Feedback listings with route on which it was posted
* Change feedback visibility - public/hidden

## How to Use
You can embed our route into another site in one line code of using an iframe. This is crucial because it requires no extra JavaScript for the you, if necessary. A static page is served and regenerated periodically to show all comments that have been approved.

```html
<iframe src="https://feedbackape.vercel.app/embed/SITE_ID/ROUTE" />
```

When embedding the feedback iframe, you might want to automatically resize the height to its contents. This can be achieved using __[iframe-resizer](https://github.com/davidjbradshaw/iframe-resizer)__.

For example, if you are using React, you can add __[iframe-resizer-react](https://github.com/davidjbradshaw/iframe-resizer-react)__ and do something like this. This library is 5.8kB minified + gzipped with no dependencies.

```jsx
<IframeResizer
  checkOrigin={false}
  title="Comments"
  src={`https://feedbackape.vercel.app/embed/SITE_ID`}
  style={{
    width: '1px',
    minWidth: '100%',
  }}
/>
```
To enable this on the embed side, we have installed iframe-resizer and included the JS snippet inside the embedded route.

## Views / Pages

Sites Page             |  Feedback Page
:-------------------------:|:-------------------------:
[![site.png](https://i.postimg.cc/25D9ntB1/site.png)](Site-page)  |  [![all-Feedback.png](https://i.postimg.cc/wxsdgCHN/all-Feedback.png)](Feedback-page)

Site Feedback             |  Account Profile
:-------------------------:|:-------------------------:
 [![site-feedback.png](https://i.postimg.cc/sx4xjcNQ/site-feedback.png)](Site-feedback) |  [![account.png](https://i.postimg.cc/NjM3t2Qf/account.png)](Account-profile)
## Built Using

- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com)
- [Firebase](https://firebase.com)
- [Chakra UI](https://chakra-ui.com/)
