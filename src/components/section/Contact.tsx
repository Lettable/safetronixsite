'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { useEffect } from "react"

export default function ContactCard() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (window.location.hash === "#contact") {
            const el = document.getElementById("contact");
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                alert("Message sent successfully.")
                setFormData({ name: "", email: "", message: "" })
            } else {
                alert(data.error || "Something went wrong.")
            }
        } catch (error) {
            alert("Something went wrong.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card id="contact" className="w-full max-w-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                    Quick Contact
                </CardTitle>
            </CardHeader>

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <Input
                        placeholder="e.g. John"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        className="border border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500"
                        required
                    />
                    <Input
                        type="email"
                        placeholder="e.g. john@suized.to"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        className="border border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500"
                        required
                    />
                    <Textarea
                        rows={4}
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                        className="border border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500 resize-none"
                        required
                    />
                </CardContent>

                <CardFooter>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-5 bg-white text-black hover:bg-white/60"
                    >
                        {isSubmitting ? "Sending..." : "Submit"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
