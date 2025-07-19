import { LoaderFunction, redirect } from "@remix-run/node"
import { tokenCookie } from "./__preauth+/login"
import { setApiToken } from "~/lib/Axios"

export const loader: LoaderFunction = async ({ request }) => {
  const cookie = request.headers.get("cookie")
  const token = await tokenCookie.parse(cookie)
  if (!token) return redirect("/login")
  setApiToken(token)

  redirect("/dashboard")
  return null
}