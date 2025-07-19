import { json, type LoaderFunction, redirect } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { Axios, setApiToken } from "~/lib/Axios"
import { useState } from "react"
import { tokenCookie } from "./__preauth+/login"

// export const loader: LoaderFunction = async ({ request }) => {
//   const cookie = request.headers.get("cookie")
//   const token = await tokenCookie.parse(cookie)
//   if (!token) return redirect("/login")
//   setApiToken(token)
// }

export default function PostauthLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100 text-black">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 border-r p-4 flex flex-col space-y-4 ${
          sidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="text-xl font-bold mb-4 text-black">Remix Boilerplate</div>

        <nav className="flex flex-col space-y-2 text-sm text-black">
          <span className="text-gray-500 italic">Menu</span>
          {/* Tambahkan Link navigasi di sini nanti */}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-4 border-b bg-white text-black">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 text-black hover:text-blue-600 focus:outline-none"
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold">Remix Boilerplate</h1>
          <form method="post" action="/login">
            <button
              type="submit"
              className="text-sm text-red-600 hover:underline"
            >
              Logout
            </button>
          </form>
        </header>

        {/* Outlet content */}
        <main className="flex-1 overflow-auto p-4 text-black">
          <Outlet />
        </main>
      </div>
    </div>
  )
}