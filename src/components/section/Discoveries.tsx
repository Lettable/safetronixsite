"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { AlertTriangle, Calendar, Globe, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SpotlightCard from "../layout/SpotlightCard";
import { Loader } from "../animate-ui/icons/loader"

interface Discovery {
    _id: string
    entity: string
    category: string
    platform: string
    date: string
    status: string
    confirmed: boolean
    description: string
}

const categories = ["All", "Terrorism", "Child Exploitation", "DMCA/Piracy", "Extremism", "Financial Crime"]
const statuses = ["All", "ACTIVE INVESTIGATION", "ESCALATED", "RESOLVED", "MONITORING", "PARTIAL"]

export default function DiscoveriesPage() {
    const [discoveries, setDiscoveries] = useState<Discovery[]>([])
    const [filteredDiscoveries, setFilteredDiscoveries] = useState<Discovery[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedStatus, setSelectedStatus] = useState("All")

    useEffect(() => {
        fetchDiscoveries()
    }, [])

    useEffect(() => {
        filterDiscoveries()
    }, [searchTerm, selectedCategory, selectedStatus, discoveries])

    const fetchDiscoveries = async () => {
        try {
            const res = await fetch("/api/discoveries")
            if (res.ok) {
                const data = await res.json()
                setDiscoveries(data.discoveries)
            }
        } catch (err) {
            console.error("Error fetching:", err)
        } finally {
            setLoading(false)
        }
    }

    const filterDiscoveries = () => {
        let filtered = discoveries
        if (searchTerm) {
            filtered = filtered.filter((d) =>
                d.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }
        if (selectedCategory !== "All") {
            filtered = filtered.filter((d) => d.category === selectedCategory)
        }
        if (selectedStatus !== "All") {
            filtered = filtered.filter((d) => d.status === selectedStatus)
        }
        setFilteredDiscoveries(filtered)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACTIVE INVESTIGATION":
                return "text-blue-500 animate-pulse"
            case "ESCALATED":
                return "text-yellow-500"
            case "RESOLVED":
                return "text-green-500"
            case "MONITORING":
                return "text-cyan-500"
            case "PARTIAL":
                return "text-orange-500 animate-pulse"
            default:
                return "text-gray-500"
        }
    }

    return (
        <div className="space-y-10">
            <div className="p-[6rem] pt-[2rem] pb-[2rem]">
                <SpotlightCard
                    className="custom-spotlight-card p-6 mt-[6rem] flex flex-col justify-center gap-4 border border-white/20 bg-white/10 backdrop-blur-md shadow-lg"
                    spotlightColor="rgba(219, 218, 226, 0)"
                >
                    <div className="glass-panel p-8">
                        <h1 className="text-white text-4xl font-bold font-orbitron mb-2">All Discoveries</h1>
                        <p className="text-white text-muted-foreground">Complete database of identified threats and ongoing investigations</p>
                    </div>

                    <div className="glass-panel p-6">
                        <div className="grid gap-4 md:grid-cols-3">
                            <div>
                                <label className="text-sm text-white font-medium mb-1 block">Search</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search discoveries..."
                                        className="pl-10 bg-transparent border border-white/20 focus:border-white/20"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-white font-medium mb-1 block">Category</label>
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger className="bg-transparent text-white border border-white/20 focus:border-white/20">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm text-white font-medium mb-1 block">Status</label>
                                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                    <SelectTrigger className="bg-transparent text-white border border-white/20 focus:border-white/20">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statuses.map((status) => (
                                            <SelectItem key={status} value={status}>{status}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </SpotlightCard>
            </div>


            <div className="space-y-4">
                {filteredDiscoveries.length > 0 ? (
                    filteredDiscoveries.map((d) => (
                        <div className="p-[6rem] pt-[2px] pb-[2px]">
                            <SpotlightCard
                                className="custom-spotlight-card p-6 flex flex-col justify-center gap-4 border border-white/20 bg-white/10 backdrop-blur-md shadow-lg"
                                spotlightColor="rgba(219, 218, 226, 0)"
                            >
                                <Link key={d._id} href={`/discovery/${d._id}`}>
                                    <div className="glass-panel p-6 transition cursor-pointer">
                                        <div className="flex flex-col lg:flex-row justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <AlertTriangle className="h-5 w-5 text-blue-500" />
                                                    <h3 className="text-xl text-white font-semibold">{d.entity}</h3>
                                                    {!d.confirmed && (
                                                        <span className="text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full text-xs animate-pulse">
                                                            UNCONFIRMED
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-muted-foreground mb-3">{d.description}</p>
                                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <Globe className="h-4 w-4" /> {d.platform}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" /> {new Date(d.date).toLocaleDateString()}
                                                    </div>
                                                    <span className="bg-gray-800/50 rounded-full px-3 py-1 text-xs">{d.category}</span>
                                                </div>
                                            </div>
                                            <div className="text-sm font-semibold whitespace-nowrap self-start lg:self-center">
                                                <span className={getStatusColor(d.status)}>{d.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </SpotlightCard>
                        </div>
                    ))
                ) : (
                    <div className="glass-panel text-center text-white p-12">
                        <Loader loop/>
                        <h3 className="text-xl font-bold">Loading...</h3>
                    </div>
                )}
            </div>
        </div>
    )
}
