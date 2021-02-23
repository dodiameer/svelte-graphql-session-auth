import { writable } from "svelte/store"
export const user = writable(null)

export const checkAuthStatus = async () => {
  let userSnapshot
  const unsub = user.subscribe(val => userSnapshot = val)
  unsub()
  if (userSnapshot !== null) {
    return
  }

  const query = `{
    me {
      id
      username
      fullname
      email
    }
  }`

  const res = await fetch("http://localhost:4040/graphql", {
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await res.json()

  if (data.errors) {
    throw data.errors
  }
  user.set(data.data.me)
  return
}