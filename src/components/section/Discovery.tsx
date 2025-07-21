"use client"

import React, { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { AlertTriangle, Calendar, Globe, Shield, TrendingUp, Users } from "lucide-react"
import ReactMarkdown from "react-markdown"
import SpotlightCard from "../layout/SpotlightCard";

interface Discovery {
    _id: string
    entity: string
    category: string
    platform: string
    date: string
    status: string
    confirmed: boolean
    description: string
    markdownContent?: string
    metadata?: {
        severity: string
        affectedUsers: number
        reportedBy: string
        lastUpdated: string
    }
}

export default function DiscoveryDetailPage() {
    const params = useParams()
    const [discovery, setDiscovery] = useState<Discovery | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        if (params.id) fetchDiscovery(params.id as string)
    }, [params.id])

    const fetchDiscovery = async (id: string) => {
        try {
            const response = await fetch(`/api/discoveries/${id}`)
            if (!response.ok) throw new Error("Discovery not found")
            const data = await response.json()
            setDiscovery(data.discovery)
        } catch (err) {
            console.error("Fetch error:", err)
            setError("Failed to load discovery")
        } finally {
            setLoading(false)
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACTIVE INVESTIGATION": return "text-blue-500"
            case "ESCALATED": return "text-yellow-500"
            case "RESOLVED": return "text-green-500"
            case "MONITORING": return "text-cyan-500"
            case "PARTIAL": return "text-orange-500"
            default: return "text-gray-500"
        }
    }

    if (loading || error || !discovery) {
        return (
            <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto px-4 py-10">
                <div className="glass-panel p-8 text-center">
                    {loading ? (
                        <div className="animate-pulse">
                            <div className="h-6 bg-blue-400/30 mb-2 rounded"></div>
                            <div className="h-4 bg-blue-400/10 rounded"></div>
                        </div>
                    ) : (
                        <>
                            <AlertTriangle className="mx-auto mb-2 h-8 w-8 text-yellow-500" />
                            <p className="text-gray-300">{error}</p>
                        </>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto px-4 py-10">
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <div className="glass-panel p-6">


                        <SpotlightCard
                            className="custom-spotlight-card mt-10 flex flex-col gap-4 border border-white/20 bg-white/10 backdrop-blur-md shadow-lg"
                            spotlightColor="rgba(219, 218, 226, 0)"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <AlertTriangle className="h-5 w-5 text-blue-500" />
                                <h1 className="text-2xl font-bold font-orbitron">{discovery.entity}</h1>
                                {!discovery.confirmed && (
                                    <span className="ml-2 px-3 py-1 text-xs bg-orange-500/20 text-orange-400 rounded-full animate-pulse">
                                        UNCONFIRMED
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-4">
                                <span className="flex items-center"><Globe className="w-4 h-4 mr-1" />{discovery.platform}</span>
                                <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{new Date(discovery.date).toLocaleDateString()}</span>
                                <span className="px-2 py-1 rounded-full bg-gray-800">{discovery.category}</span>
                                <span className={`px-2 py-1 rounded-full font-semibold ${getStatusColor(discovery.status)}`}>{discovery.status}</span>
                            </div>


                            <div className="text-gray-300 space-y-4">
                                <h3 className="font-semibold text-lg">Description</h3>
                                <p>{discovery.description}</p>

                                {discovery.markdownContent && (
                                    <>
                                        <h3 className="font-semibold text-lg">Detailed Report</h3>
                                        <ReactMarkdown>{discovery.markdownContent}</ReactMarkdown>
                                    </>
                                )}
                            </div>
                        </SpotlightCard>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <SpotlightCard
                        className="custom-spotlight-card mt-16 flex flex-col gap-4 border border-white/20 bg-white/10 backdrop-blur-md shadow-lg"
                        spotlightColor="rgba(219, 218, 226, 0)"
                    >
                        <div className="glass-panel p-6">
                            <h3 className="text-sm font-bold text-blue-400 mb-4">Investigation Status</h3>
                            <div className="text-sm text-gray-300 space-y-2">
                                <div className="flex justify-between">
                                    <span>Current</span><span className={getStatusColor(discovery.status)}>{discovery.status}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Confirmed</span><span className={discovery.confirmed ? "text-green-400" : "text-orange-400"}>{discovery.confirmed ? "Yes" : "Pending"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Category</span><span className="text-blue-400">{discovery.category}</span>
                                </div>
                            </div>
                        </div>
                    </SpotlightCard>

                    {discovery.metadata && (

                        <SpotlightCard
                            className="custom-spotlight-card mt-3 flex flex-col gap-4 border border-white/20 bg-white/10 backdrop-blur-md shadow-lg"
                            spotlightColor="rgba(219, 218, 226, 0)"
                        >
                            <div className="glass-panel-cyan p-6">
                                <h3 className="text-sm font-bold text-cyan-400 mb-4">Investigation Details</h3>
                                <div className="text-sm text-gray-300 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span>Severity</span><span className="text-cyan-400 font-bold">{discovery.metadata.severity}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Affected Users</span><span className="text-yellow-400">{discovery.metadata.affectedUsers.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Reported By</span><span>{discovery.metadata.reportedBy}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Last Updated</span><span>{new Date(discovery.metadata.lastUpdated).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </SpotlightCard>
                    )}
                    <SpotlightCard
                        className="custom-spotlight-card mt-3 flex flex-col gap-4 border border-white/20 bg-white/10 backdrop-blur-md shadow-lg"
                        spotlightColor="rgba(219, 218, 226, 0)"
                    >
                        <div className="glass-panel-green p-6">
                            <h3 className="text-sm font-bold text-green-400 mb-4">Quick Stats</h3>
                            <div className="text-sm text-gray-300 space-y-3">
                                <div className="flex justify-between">
                                    <span>ID</span><span className="font-mono text-green-400">{discovery._id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Risk</span><span className="font-bold text-green-400">HIGH</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Response</span><span className="text-green-400">&lt; 24 hours</span>
                                </div>
                            </div>
                        </div>
                    </SpotlightCard>
                    <SpotlightCard
                        className="custom-spotlight-card mt-3 flex flex-col gap-4 border border-white/20 bg-white/10 backdrop-blur-md shadow-lg"
                        spotlightColor="rgba(219, 218, 226, 0)"
                    >
                        <div className="glass-panel p-6">
                            <h3 className="text-sm font-bold text-blue-400 mb-4">Need Help?</h3>
                            <p className="text-xs text-gray-300 mb-4">If you have more info, contact our team.</p>
                            <button className="w-full glass-button py-2 text-xs font-semibold hover:glow-blue transition-all duration-300">
                                Report Additional Info
                            </button>
                        </div>
                    </SpotlightCard>
                </div>
            </div>
        </div>
    )
}
