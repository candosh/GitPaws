import { type NextRequest, NextResponse } from "next/server"
import { createCanvas } from "canvas"

interface GitHubCommitData {
  total_count: number
  weeks: Array<{
    w: number
    a: number
    d: number
    c: number
  }>
}

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  try {
    const { username } = params

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    // Get current year's commit data
    const currentYear = new Date().getFullYear()
    const startDate = `${currentYear}-01-01T00:00:00Z`
    const endDate = `${currentYear}-12-31T23:59:59Z`

    // GitHub API call
    const response = await fetch(
      `https://api.github.com/search/commits?q=author:${username}+committer-date:${startDate}..${endDate}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "GitPaws-App",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
      },
    )

    if (!response.ok) {
      if (response.status === 404) {
        // Return default sleeping cat for non-existent users
        const commitCount = 0
        const catStage = getCatStage(commitCount)
        const imageBuffer = await generateCatImage(catStage, commitCount, username)

        return new NextResponse(imageBuffer, {
          headers: {
            "Content-Type": "image/png",
            "Cache-Control": "public, max-age=3600",
          },
        })
      }
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data: GitHubCommitData = await response.json()
    const commitCount = data.total_count || 0
    const catStage = getCatStage(commitCount)

    // Generate cat image
    const imageBuffer = await generateCatImage(catStage, commitCount, username)

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error("Cat API Error:", error)

    // Return a default error cat image
    const errorImageBuffer = await generateErrorCatImage()
    return new NextResponse(errorImageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=300", // Cache error for 5 minutes
      },
    })
  }
}

function getCatStage(commitCount: number): number {
  if (commitCount === 0) return 0 // Sleeping Cat
  if (commitCount <= 25) return 1 // Baby Kitten
  if (commitCount <= 75) return 2 // Curious Kitten
  if (commitCount <= 150) return 3 // Active Cat
  if (commitCount <= 300) return 4 // Adult Cat
  if (commitCount <= 500) return 5 // Developer Cat
  return 6 // Master Cat
}

async function generateCatImage(stage: number, commitCount: number, username: string): Promise<Buffer> {
  const canvas = createCanvas(400, 200)
  const ctx = canvas.getContext("2d")

  // Set background
  ctx.fillStyle = "#f8fafc"
  ctx.fillRect(0, 0, 400, 200)

  // Draw cat based on stage (simplified version for server-side)
  drawSimpleCat(ctx, stage, commitCount, username)

  return canvas.toBuffer("image/png")
}

async function generateErrorCatImage(): Promise<Buffer> {
  const canvas = createCanvas(400, 200)
  const ctx = canvas.getContext("2d")

  // Error background
  ctx.fillStyle = "#fee2e2"
  ctx.fillRect(0, 0, 400, 200)

  // Error message
  ctx.fillStyle = "#dc2626"
  ctx.font = "20px Arial"
  ctx.textAlign = "center"
  ctx.fillText("😿 Cat not found", 200, 100)
  ctx.font = "14px Arial"
  ctx.fillText("Please try again later", 200, 130)

  return canvas.toBuffer("image/png")
}

function drawSimpleCat(ctx: any, stage: number, commitCount: number, username: string) {
  const catColors = ["#A0A0A0", "#FFB366", "#FF9A56", "#D2691E", "#8B7D6B", "#696969", "#FFD700"]
  const catNames = [
    "Sleepy Cat",
    "Baby Kitten",
    "Curious Kitten",
    "Active Cat",
    "Adult Cat",
    "Developer Cat",
    "Master Cat",
  ]

  // Background
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(20, 20, 360, 160)
  ctx.strokeStyle = "#e5e7eb"
  ctx.lineWidth = 2
  ctx.strokeRect(20, 20, 360, 160)

  // Cat body (simplified)
  ctx.fillStyle = catColors[stage]
  ctx.beginPath()
  ctx.arc(120, 100, 40, 0, Math.PI * 2)
  ctx.fill()

  // Cat ears
  ctx.beginPath()
  ctx.arc(100, 70, 15, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(140, 70, 15, 0, Math.PI * 2)
  ctx.fill()

  // Cat eyes
  ctx.fillStyle = "#000000"
  ctx.beginPath()
  ctx.arc(110, 90, 5, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(130, 90, 5, 0, Math.PI * 2)
  ctx.fill()

  // Cat nose
  ctx.fillStyle = "#ff69b4"
  ctx.beginPath()
  ctx.arc(120, 100, 3, 0, Math.PI * 2)
  ctx.fill()

  // Text info
  ctx.fillStyle = "#1f2937"
  ctx.font = "bold 24px Arial"
  ctx.textAlign = "left"
  ctx.fillText(`@${username}`, 200, 60)

  ctx.font = "18px Arial"
  ctx.fillText(catNames[stage], 200, 90)

  ctx.font = "16px Arial"
  ctx.fillStyle = "#6b7280"
  ctx.fillText(`${commitCount} commits this year`, 200, 115)

  ctx.fillText(`Level ${stage}`, 200, 140)

  // GitPaws branding
  ctx.font = "12px Arial"
  ctx.fillStyle = "#9ca3af"
  ctx.textAlign = "center"
  ctx.fillText("Generated by GitPaws 🐾", 200, 170)
}
