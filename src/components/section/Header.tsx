'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

type NavLink = {
  name: string
  href: string
}

type GlassNavProps = {
  logo?: React.ReactNode
  links: NavLink[]
}

export default function Header({ logo, links }: GlassNavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4">
      <nav className="flex items-center justify-between max-w-5xl mx-auto rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-3" onClick={() => {router.push("/")}}>
          {logo || (
            <span className="text-white font-semibold text-lg">Safetronix</span>
          )}
        </div>

        <div className="hidden md:flex items-center gap-6">
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="text-white font-medium transition hover:opacity-80"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="md:hidden z-[60]">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:text-gray-300 transition"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="absolute top-[72px] left-0 w-full z-[40] px-4 md:hidden transition-all duration-300">
          <div className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-md shadow-2xl p-6 space-y-4 animate-fade-in-down">
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-white text-lg font-medium transition hover:opacity-80"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
