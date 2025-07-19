// app/routes/__preauth+/login.tsx
import {
  json,
  type ActionFunctionArgs,
  createCookie,
  redirect,
} from "@remix-run/node"
import { Form, useActionData, useNavigation } from "@remix-run/react"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { Axios } from "~/lib/Axios"

type FormInputs = {
  email: string
  password: string
}

export const tokenCookie = createCookie("token", {
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  maxAge: 60 * 60 * 24,
})

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")

  if (typeof email !== "string" || typeof password !== "string") {
    return json({ error: "Email dan password wajib diisi" }, { status: 400 })
  }

  try {
    const res = await Axios.post("/users/login", { email, password })
    const token = res.data.token

    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await tokenCookie.serialize(token),
      },
    })
  } catch (error: any) {
    const message = error.response?.data?.message || "Login gagal"
    return json({ error: message }, { status: 401 })
  }
}

export default function LoginPage() {
  const actionData = useActionData<typeof action>()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  const { register, handleSubmit } = useForm<FormInputs>()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (actionData?.error) {
      setErrorMessage(actionData.error)
    }
  }, [actionData])


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Masuk ke Akun Anda</h2>
          <p className="text-sm text-gray-600">Gunakan email dan password Anda</p>
        </div>

        {errorMessage && (
          <div className="mb-4 px-4 py-2 bg-red-100 text-red-700 rounded text-sm text-center">
            {errorMessage}
          </div>
        )}

        <Form method="post" onSubmit={handleSubmit(() => {})} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Memproses..." : "Masuk"}
          </button>
        </Form>
      </div>
    </div>
  )
}