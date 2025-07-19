import { Outlet } from "@remix-run/react"

export default function PreAuthLayout() {
  return (
    <div className="w-full h-full">
        <Outlet />
    </div>
  )
}