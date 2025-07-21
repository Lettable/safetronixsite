"use client"

import type React from "react"
import { useState } from "react"
import AdminDashboard from "@/components/admin/AdminDashboard"
import Aurora from "@/components/layout/Aurora"
import { RippleButton } from "@/components/animate-ui/buttons/ripple"
import SpotlightCard from "@/components/layout/SpotlightCard"

const k: { o: string; m: string; d: string } = {
    o: atob("S0RHSC1TREpTLTkwREYtQ1NBTQ=="),
    m: atob("SW52YWxpZCBhZG1pbiBrZXk="),
    d: atob("YWRtaW4xMjM="),
}

export default function AdminPage() {
    const [slug, setSlug] = useState("")
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (slug === k.o) {
            setIsAuthenticated(true)
        } else {
            alert(k.m)
        }
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="fixed inset-0 -z-50 bg-black pointer-events-none" aria-hidden="true">
                    <Aurora
                        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                        blend={0.5}
                        amplitude={1.0}
                        speed={0.5}
                    />
                </div>
                <div className="glass-panel p-8 w-full max-w-md">
                                            <SpotlightCard
                            className="custom-spotlight-card mt-10 flex flex-col gap-4 border border-white/20 bg-white/10 backdrop-blur-md shadow-lg"
                            spotlightColor="rgba(219, 218, 226, 0)"
                        >
                    <h1 className="text-2xl font-bold mb-6 text-center text-white text-glow font-orbitron">Admin Access</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm text-white font-medium mb-2">Admin Key</label>
                            <input
                                type="password"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full px-4 py-3 text-white bg-black/50 border border-white/40 rounded-lg focus:border-red-500 focus:outline-none"
                                placeholder="Enter admin key"
                                required
                            />
                        </div>
                        <RippleButton
                            type="submit"
                            className="w-full glass-button px-6 py-3 font-semibold hover:glow-red transition-all duration-300"
                        >
                            Access Dashboard
                        </RippleButton>
                    </form>
                    </SpotlightCard>
                </div>
            </div>
        )
    }

    return <AdminDashboard />
}
