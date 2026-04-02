"use client"

import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b px-6 py-3 flex justify-between items-center">

      <Link href="/" className="text-lg font-semibold text-black">
        MyPortal
      </Link>

      <div className="flex gap-4 items-center">
        <Link
          href="/"
          className="text-sm text-gray-700 hover:text-black transition"
        >
          Home
        </Link>

        <Link
          href="/login"
          className="text-sm bg-black text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition"
        >
          Sign In
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
