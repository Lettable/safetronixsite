"use client"

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Shield } from "lucide-react"
import { useState } from "react"
import { Loader } from "../animate-ui/icons/loader"
import { Send } from "../animate-ui/icons/send"
import { useEffect } from "react"

const platforms = [
    "Facebook",
    "Twitter/X",
    "Instagram",
    "TikTok",
    "YouTube",
    "Telegram",
    "Discord",
    "Reddit",
    "WhatsApp",
    "Dark Web",
    "Other",
]

const threatTypes = [
    "Terrorism",
    "Child Exploitation",
    "DMCA/Piracy",
    "Extremism",
    "Financial Crime",
    "Other",
]

export default function ReportFormCard() {
    const [formData, setFormData] = useState({
        name: "",
        platform: "",
        description: "",
        category: [] as string[],
        anonymous: false,
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleCategoryChange = (category: string) => {
        setFormData((prev) => ({
            ...prev,
            category: prev.category.includes(category)
                ? prev.category.filter((c) => c !== category)
                : [...prev.category, category],
        }))
    }

    useEffect(() => {
        if (window.location.hash === "#report") {
            const el = document.getElementById("report");
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch("/api/threatreports", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()
            if (response.ok) {
                alert("Report submitted successfully.")
                setFormData({
                    name: "",
                    platform: "",
                    description: "",
                    category: [],
                    anonymous: false,
                })
            } else {
                alert(data.error || "Error submitting report.")
            }
        } catch {
            alert("Submission failed.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card id="report" className="w-full max-w-3xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg text-white">
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle className="text-2xl">Report a Threat</CardTitle>
                    <CardDescription>
                        Help us track down digital abuse. Your data is secure and confidential.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                            id="anonymous"
                            checked={formData.anonymous}
                            onCheckedChange={(val: boolean) =>
                                setFormData((prev) => ({ ...prev, anonymous: val }))
                            }
                        />
                        <Label htmlFor="anonymous" className="text-sm">
                            Submit anonymously
                        </Label>
                    </div>

                    {!formData.anonymous && (
                        <div>
                            <Label htmlFor="name">Your Name / Handle</Label>
                            <Input
                                className="border border-white/20 mt-2"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. John"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <Label>Platform</Label>
                        <Select
                            value={formData.platform}
                            onValueChange={(value) => setFormData({ ...formData, platform: value })}
                        >
                            <SelectTrigger className="mt-2 border border-white/20">
                                <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                            <SelectContent className="border border-white/20 bg-white/10 backdrop-blur-md shadow-lg">
                                {platforms.map((p) => (
                                    <SelectItem key={p} value={p}>
                                        {p}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Threat Categories</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
                            {threatTypes.map((type) => (
                                <div key={type} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={type}
                                        checked={formData.category.includes(type)}
                                        onCheckedChange={() => handleCategoryChange(type)}
                                    />
                                    <Label htmlFor={type}>{type}</Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Label>Description</Label>
                        <Textarea
                            className="mt-2 border border-white/20"
                            rows={6}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Explain the threat, include links, usernames, etc..."
                            required
                        />
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                    <Button type="submit" className="w-full mt-5 bg-white text-black hover:bg-white/60" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader animateOnHover />
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Send animateOnHover />
                                Submit Report
                            </>
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
