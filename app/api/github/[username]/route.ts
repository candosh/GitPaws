import { type NextRequest, NextResponse } from "next/server"

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
          "User-Agent": "CommitCat-App",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
      },
    )

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "User not found", commitCount: 0 }, { status: 404 })
      }
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data: GitHubCommitData = await response.json()
    const commitCount = data.total_count || 0

    // Determine cat stage based on commit count
    const catStage = getCatStage(commitCount)

    return NextResponse.json({
      username,
      commitCount,
      catStage,
      year: currentYear,
    })
  } catch (error) {
    console.error("GitHub API Error:", error)
    return NextResponse.json({ error: "Failed to fetch commit data", commitCount: 0 }, { status: 500 })
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
