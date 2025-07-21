import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function PUT(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()

    const url = new URL(request.url)
    const id = url.pathname.split("/").at(-2)

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid discovery ID" }, { status: 400 })
    }

    const result = await db.collection("discoveries").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: "RESOLVED",
          confirmed: true,
          resolvedAt: new Date(),
          updatedAt: new Date(),
        },
      }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Discovery not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Discovery marked as resolved" })
  } catch (error) {
    console.error("Error resolving discovery:", error)
    return NextResponse.json({ success: false, error: "Failed to resolve discovery" }, { status: 500 })
  }
}