import CloudflareWorkerGlobalScope from 'types-cloudflare-worker'
declare var self: CloudflareWorkerGlobalScope

const someHTML = `
<!DOCTYPE html>
<html>
<body>

<h1>Hello World</h1>
<p>This is all generated using a Worker</p>
<iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
></iframe>

</body>
</html>
`
interface someJSON {
  results?: string[]
  errors?: string | null
  msg?: string
}
const someJSON: someJSON = {
  results: ['some', 'results'],
  errors: null,
  msg: 'this is some random json',
}

/**
 * rawHtmlResponse delievers a response with HTML inputted directly
 * into the worker script
 * @param {string} html
 */
async function rawHtmlResponse(html: string) {
  const init = {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  }

  return new Response(html, init)
}

/**
 * rawJsonResponse delievers a response with a Json Object inputted directly
 * into the worker script
 * @param {Object} json
 */
async function rawJsonResponse(json: someJSON) {
  const init = {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  }

  return new Response(JSON.stringify(json), init)
}

//TODO add simple make subrequest

/**
 * TODO changeto use KV will need mime types https://www.npmjs.com/package/mime-types
 */

self.addEventListener('fetch', (event: FetchEvent) => {
  const { url } = event.request

  if (url.endsWith('/html')) {
    return event.respondWith(rawHtmlResponse(someHTML))
  }
  if (url.endsWith('/json')) {
    return event.respondWith(rawJsonResponse(someJSON))
  }
})
