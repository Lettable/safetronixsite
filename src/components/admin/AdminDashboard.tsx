"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Plus, Trash2 } from "lucide-react"
import Aurora from "@/components/layout/Aurora";
import SpotlightCard from "../layout/SpotlightCard";
import { RippleButton } from '@/components/animate-ui/buttons/ripple';

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
}

const mockChartData = [
  { date: "2024-01-01", terrorism: 12, abuse: 8, dmca: 25, extremism: 15, fraud: 10 },
  { date: "2024-01-02", terrorism: 15, abuse: 12, dmca: 30, extremism: 18, fraud: 14 },
  { date: "2024-01-03", terrorism: 10, abuse: 6, dmca: 22, extremism: 12, fraud: 8 },
  { date: "2024-01-04", terrorism: 18, abuse: 15, dmca: 35, extremism: 22, fraud: 16 },
  { date: "2024-01-05", terrorism: 14, abuse: 10, dmca: 28, extremism: 16, fraud: 12 },
  { date: "2024-01-06", terrorism: 20, abuse: 18, dmca: 40, extremism: 25, fraud: 20 },
  { date: "2024-01-07", terrorism: 16, abuse: 14, dmca: 32, extremism: 20, fraud: 15 },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalReports: 1247,
    activeInvestigations: 89,
    resolvedThreats: 1158,
    platformsCovered: 247,
  })

  const [discoveries, setDiscoveries] = useState<Discovery[]>([])
  const [loading, setLoading] = useState(true)
  const [editingDiscovery, setEditingDiscovery] = useState<Discovery | null>(null)
  const [threatReports, setThreatReports] = useState([])
  const [contacts, setContacts] = useState([])

  const [newDiscovery, setNewDiscovery] = useState({
    entity: "",
    category: "",
    platform: "",
    description: "",
    markdownContent: "",
    status: "PARTIAL",
    confirmed: false,
  })

  const [activeTab, setActiveTab] = useState("discoveries")

  useEffect(() => {
    fetchDiscoveries()
    fetchThreatReports()
    fetchContacts()
  }, [])

  const fetchThreatReports = async () => {
    try {
      const response = await fetch("/api/threatreports")
      if (response.ok) {
        const data = await response.json()
        setThreatReports(data.reports)
      }
    } catch (error) {
      console.error("Error fetching threat reports:", error)
    }
  }

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contact")
      if (response.ok) {
        const data = await response.json()
        setContacts(data.contacts)
      }
    } catch (error) {
      console.error("Error fetching contacts:", error)
    }
  }

  const fetchDiscoveries = async () => {
    try {
      const response = await fetch("/api/discoveries")
      if (response.ok) {
        const data = await response.json()
        setDiscoveries(data.discoveries)
      }
    } catch (error) {
      console.error("Error fetching discoveries:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditDiscovery = (discovery: Discovery) => {
    setEditingDiscovery(discovery)
    setNewDiscovery({
      entity: discovery.entity,
      category: discovery.category,
      platform: discovery.platform,
      description: discovery.description,
      markdownContent: discovery.markdownContent || "",
      status: discovery.status,
      confirmed: discovery.confirmed,
    })
  }

  const handleUpdateDiscovery = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingDiscovery) return

    try {
      const response = await fetch(`/api/discoveries/${editingDiscovery._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDiscovery),
      })

      if (response.ok) {
        alert("Discovery updated successfully!")
        setEditingDiscovery(null)
        setNewDiscovery({
          entity: "",
          category: "",
          platform: "",
          description: "",
          markdownContent: "",
          status: "PARTIAL",
          confirmed: false,
        })
        fetchDiscoveries()
      } else {
        alert("Error updating discovery")
      }
    } catch (error) {
      console.error("Error updating discovery:", error)
      alert("Error updating discovery")
    }
  }

  const handleSubmitDiscovery = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingDiscovery) {
      await handleUpdateDiscovery(e)
    } else {
      try {
        const response = await fetch("/api/discoveries", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDiscovery),
        })

        if (response.ok) {
          alert("Discovery added successfully!")
          setNewDiscovery({
            entity: "",
            category: "",
            platform: "",
            description: "",
            markdownContent: "",
            status: "PARTIAL",
            confirmed: false,
          })
          fetchDiscoveries()
        } else {
          alert("Error adding discovery")
        }
      } catch (error) {
        console.error("Error adding discovery:", error)
        alert("Error adding discovery")
      }
    }
  }

  const handleDeleteDiscovery = async (id: string) => {
    if (confirm("Are you sure you want to delete this discovery?")) {
      try {
        const response = await fetch(`/api/discoveries/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          alert("Discovery deleted successfully!")
          fetchDiscoveries()
        } else {
          alert("Error deleting discovery")
        }
      } catch (error) {
        console.error("Error deleting discovery:", error)
        alert("Error deleting discovery")
      }
    }
  }

  const handleConfirmDiscovery = async (id: string) => {
    try {
      const response = await fetch(`/api/discoveries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          confirmed: true,
          status: "ACTIVE INVESTIGATION",
        }),
      })

      if (response.ok) {
        alert("Discovery confirmed successfully!")
        fetchDiscoveries()
      } else {
        alert("Error confirming discovery")
      }
    } catch (error) {
      console.error("Error confirming discovery:", error)
      alert("Error confirming discovery")
    }
  }

  const handleResolveDiscovery = async (id: string) => {
    if (confirm("Are you sure you want to mark this discovery as resolved? This action cannot be undone.")) {
      try {
        const response = await fetch(`/api/discoveries/${id}/resolve`, {
          method: "PUT",
        })

        if (response.ok) {
          alert("Discovery marked as resolved successfully!")
          fetchDiscoveries()
        } else {
          alert("Error resolving discovery")
        }
      } catch (error) {
        console.error("Error resolving discovery:", error)
        alert("Error resolving discovery")
      }
    }
  }

  const handleThreatReportAction = async (id: string, action: string) => {
    try {
      const response = await fetch(`/api/threatreports/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      })

      if (response.ok) {
        alert(`Threat report ${action}d successfully!`)
        fetchThreatReports()
      } else {
        alert(`Error ${action}ing threat report`)
      }
    } catch (error) {
      console.error(`Error ${action}ing threat report:`, error)
      alert(`Error ${action}ing threat report`)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE INVESTIGATION":
        return "text-blue-500"
      case "ESCALATED":
        return "text-yellow-500"
      case "RESOLVED":
        return "text-green-500"
      case "MONITORING":
        return "text-cyan-500"
      case "PARTIAL":
        return "text-orange-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="fixed inset-0 -z-50 bg-black pointer-events-none" aria-hidden="true">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <div className="max-w-7xl mx-auto">
        <SpotlightCard
          className="custom-spotlight-card flex flex-col justify-center gap-4 border border-white/20 bg-white/10 backdrop-blur-md shadow-lg"
          spotlightColor="rgba(219, 218, 226, 0)"
        >
          <div className="glass-panel p-6 mb-8">
            <h1 className="text-3xl font-bold mb-2 text-white text-glow font-orbitron">Admin Dashboard</h1>
            <p className="text-gray-300 mb-[-35px]">Safetronix Intelligence Control Center</p>
          </div>
        </SpotlightCard>
        <div className="glass-panel-cyan p-4 mb-8">
          <div className="flex space-x-4">
            <RippleButton
              onClick={() => setActiveTab("discoveries")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === "discoveries" ? "text-white" : "hover:bg-cyan-500/10"
                }`}
            >
              Manage Discoveries
            </RippleButton>
            <RippleButton
              onClick={() => setActiveTab("reports")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === "reports" ? "text-white" : "hover:bg-cyan-500/10"
                }`}
            >
              Threat Reports
            </RippleButton>
            <RippleButton
              onClick={() => setActiveTab("contacts")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === "contacts" ? "text-white" : "hover:bg-cyan-500/10"
                }`}
            >
              Contact Forms
            </RippleButton>
          </div>
        </div>

        {activeTab === "discoveries" && (
          <div className="space-y-8">
            {/* Add New Discovery */}
            <div className="glass-panel-green p-6">
              <h3 className="text-xl font-bold mb-4 text-white">
                {editingDiscovery ? "Edit Discovery" : "Add New Discovery"}
              </h3>
              <form onSubmit={handleSubmitDiscovery} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Entity Name</label>
                    <input
                      type="text"
                      value={newDiscovery.entity}
                      onChange={(e) => setNewDiscovery((prev) => ({ ...prev, entity: e.target.value }))}
                      className="w-full px-3 py-2 bg-black/50 text-white border border-white/20 rounded-lg focus:border-white/20 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Category</label>
                    <select
                      value={newDiscovery.category}
                      onChange={(e) => setNewDiscovery((prev) => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 text-white bg-black/50 border border-white/20 rounded-lg focus:border-white/20 focus:outline-none"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Terrorism">Terrorism</option>
                      <option value="Child Exploitation">Child Exploitation</option>
                      <option value="DMCA/Piracy">DMCA/Piracy</option>
                      <option value="Extremism">Extremism</option>
                      <option value="Financial Crime">Financial Crime</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-white font-medium mb-2">Platform</label>
                    <input
                      type="text"
                      value={newDiscovery.platform}
                      onChange={(e) => setNewDiscovery((prev) => ({ ...prev, platform: e.target.value }))}
                      className="w-full px-3 py-2 text-white bg-black/50 border border-white/20 rounded-lg focus:border-white/20 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white font-medium mb-2">Status</label>
                    <select
                      value={newDiscovery.status}
                      onChange={(e) => setNewDiscovery((prev) => ({ ...prev, status: e.target.value }))}
                      className="w-full px-3 py-2 text-white bg-black/50 border border-white/20 rounded-lg focus:border-white/20 focus:outline-none"
                    >
                      <option value="PARTIAL">Partial (Unconfirmed)</option>
                      <option value="ACTIVE INVESTIGATION">Active Investigation</option>
                      <option value="MONITORING">Monitoring</option>
                      <option value="ESCALATED">Escalated</option>
                      <option value="RESOLVED">Resolved</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white font-medium mb-2">Description</label>
                  <textarea
                    placeholder="Enter detailed description"
                    value={newDiscovery.description}
                    onChange={(e) => setNewDiscovery((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 bg-black/50 border text-white border-white/20 rounded-lg focus:border-white/20 focus:outline-none"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Markdown Content (Optional)</label>
                  <textarea
                    value={newDiscovery.markdownContent}
                    onChange={(e) => setNewDiscovery((prev) => ({ ...prev, markdownContent: e.target.value }))}
                    className="w-full px-3 py-2 bg-black/50 text-white placeholder:text-white/20 border border-white/20 rounded-lg focus:border-white/20 focus:outline-none"
                    rows={6}
                    placeholder="Enter detailed markdown content for the discovery page..."
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="confirmed"
                    checked={newDiscovery.confirmed}
                    onChange={(e) => setNewDiscovery((prev) => ({ ...prev, confirmed: e.target.checked }))}
                    className="w-4 h-4 text-green-500 bg-black border-green-500/30 rounded focus:ring-green-500"
                  />
                  <label htmlFor="confirmed" className="text-sm text-gray-300">
                    Mark as confirmed
                  </label>
                </div>

                <div className="flex space-x-4">
                  <RippleButton
                    type="submit"
                    className="glass-button-green px-6 py-2 font-semibold hover:glow-green transition-all duration-300 flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>{editingDiscovery ? "Update Discovery" : "Add Discovery"}</span>
                  </RippleButton>

                  {editingDiscovery && (
                    <RippleButton
                      type="button"
                      onClick={() => {
                        setEditingDiscovery(null)
                        setNewDiscovery({
                          entity: "",
                          category: "",
                          platform: "",
                          description: "",
                          markdownContent: "",
                          status: "PARTIAL",
                          confirmed: false,
                        })
                      }}
                      className="glass-button px-6 py-2 font-semibold hover:glow-blue transition-all duration-300"
                    >
                      Cancel Edit
                    </RippleButton>
                  )}
                </div>
              </form>
            </div>

            {/* Manage Existing Discoveries */}
            <div className="glass-panel p-6">
              <h3 className="text-xl text-white font-bold mb-4">Manage Discoveries</h3>
              {loading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-blue-500/10 rounded"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {discoveries.map((discovery) => (
                    <SpotlightCard
                      className="custom-spotlight-card flex flex-col justify-center gap-4 border border-white/20 bg-white/10 backdrop-blur-md shadow-lg"
                      spotlightColor="rgba(219, 218, 226, 0)"
                    >
                      <div key={discovery._id} className="glass-panel p-4 border-gray-500/20">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <h4 className="text-lg text-white font-bold">{discovery.entity}</h4>
                              {!discovery.confirmed && (
                                <span className="ml-2 px-2 py-1 text-xs bg-orange-500/20 text-orange-400 rounded-full">
                                  UNCONFIRMED
                                </span>
                              )}
                            </div>
                            <p className="text-gray-300 text-sm mb-2">{discovery.description}</p>
                            <div className="flex space-x-4 text-sm text-gray-400">
                              <span>{discovery.platform}</span>
                              <span>{discovery.category}</span>
                              <span className={getStatusColor(discovery.status)}>{discovery.status}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            {discovery.status !== "RESOLVED" && (
                              <RippleButton
                                onClick={() => handleResolveDiscovery(discovery._id)}
                                className="glass-button-green px-3 py-1 text-sm hover:glow-green transition-all duration-300"
                              >
                                Resolve
                              </RippleButton>
                            )}
                            <RippleButton
                              onClick={() => handleEditDiscovery(discovery)}
                              className="glass-button-cyan px-3 py-1 text-sm hover:glow-cyan transition-all duration-300"
                            >
                              Edit
                            </RippleButton>
                            {!discovery.confirmed && (
                              <RippleButton
                                onClick={() => handleConfirmDiscovery(discovery._id)}
                                className="glass-button-green px-3 py-1 text-sm hover:glow-green transition-all duration-300"
                              >
                                Confirm
                              </RippleButton>
                            )}
                            <RippleButton
                              onClick={() => handleDeleteDiscovery(discovery._id)}
                              className="glass-button px-3 py-1 text-sm hover:glow-blue transition-all duration-300 flex items-center space-x-1"
                            >
                              <Trash2 className="h-3 w-3" />
                              <span>Delete</span>
                            </RippleButton>
                          </div>
                        </div>
                      </div>
                    </SpotlightCard>
                  ))}

                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="glass-panel p-6">
            <h3 className="text-xl text-white font-bold mb-4">Threat Reports</h3>
            <div className="space-y-4">
              {threatReports.map((report: any) => (
                <SpotlightCard
                  className="custom-spotlight-card flex flex-col justify-center gap-4 border border-white/20 bg-white/10 backdrop-blur-md shadow-lg"
                  spotlightColor="rgba(219, 218, 226, 0)"
                >
                  <div key={report._id} className="glass-panel p-4 border-gray-500/20">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h4 className="text-lg font-bold">{report.name}</h4>
                          <span
                            className={`ml-2 px-2 py-1 text-xs rounded-full ${report.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : report.status === "approved"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                              }`}
                          >
                            {report.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{report.description}</p>
                        <div className="flex space-x-4 text-sm text-gray-400">
                          <span>{report.platform}</span>
                          <span>{report.category.join(", ")}</span>
                          <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        {report.status === "pending" && (
                          <>
                            <RippleButton
                              onClick={() => handleThreatReportAction(report._id, "approve")}
                              className="glass-button-green px-3 py-1 text-sm hover:glow-green transition-all duration-300"
                            >
                              Approve
                            </RippleButton>
                            <RippleButton
                              onClick={() => handleThreatReportAction(report._id, "reject")}
                              className="glass-button px-3 py-1 text-sm hover:glow-blue transition-all duration-300"
                            >
                              Reject
                            </RippleButton>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === "contacts" && (
          <div className="glass-panel p-6">
            <h3 className="text-xl text-white font-bold mb-4">Contact Forms</h3>
            <div className="space-y-4">
              {contacts.map((contact: any) => (
                <SpotlightCard
                  className="custom-spotlight-card flex flex-col justify-center gap-4 border border-white/20 bg-white/10 backdrop-blur-md shadow-lg"
                  spotlightColor="rgba(219, 218, 226, 0)"
                >
                  <div key={contact._id} className="glass-panel p-4 border-gray-500/20">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h4 className="text-lg text-white font-bold">{contact.name}</h4>
                          <span className="ml-2 text-sm text-gray-400">{contact.email}</span>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{contact.message}</p>
                        <div className="flex space-x-4 text-sm text-gray-400">
                          <span>IP: {contact.ip}</span>
                          <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
