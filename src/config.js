// Contact-form Worker (worker/). The real address is set in Task 11, after
// `wrangler deploy` prints it; VITE_CONTACT_ENDPOINT overrides it for local checks.
export const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || 'https://knate42-contact.knate42-contact.workers.dev'
