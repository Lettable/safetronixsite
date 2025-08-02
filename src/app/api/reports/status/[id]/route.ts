import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const reportId = params.id.replace('#', '') // Remove # if present

    const report = await db.collection("reportstatus").findOne({ reportId })

    if (!report) {
      return NextResponse.json({ success: false, error: "Report not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      report: {
        ...report,
        _id: report._id.toString(),
      },
    })
  } catch (error) {
    console.error("Error fetching report status:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch report status" }, { status: 500 })
  }
}