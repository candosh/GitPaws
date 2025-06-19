"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const catStages = [
  {
    id: 0,
    name: "Sleepy Cat",
    commits: "0 commits",
    commitRange: [0, 0],
    description: "No coding activity yet",
    color: "#A0A0A0",
    animation: "sleeping",
  },
  {
    id: 1,
    name: "Baby Kitten",
    commits: "1-25 commits",
    commitRange: [1, 25],
    description: "Just started coding! 🌱",
    color: "#FFB366",
    animation: "blinking",
  },
  {
    id: 2,
    name: "Curious Kitten",
    commits: "26-75 commits",
    commitRange: [26, 75],
    description: "Coding is fun! ✨",
    color: "#FF9A56",
    animation: "playing",
  },
  {
    id: 3,
    name: "Active Cat",
    commits: "76-150 commits",
    commitRange: [76, 150],
    description: "Coding enthusiast! 🚀",
    color: "#D2691E",
    animation: "bouncing",
  },
  {
    id: 4,
    name: "Adult Cat",
    commits: "151-300 commits",
    commitRange: [151, 300],
    description: "Reliable developer 💪",
    color: "#8B7D6B",
    animation: "sitting",
  },
  {
    id: 5,
    name: "Developer Cat",
    commits: "301-500 commits",
    commitRange: [301, 500],
    description: "True developer! 👨‍💻",
    color: "#696969",
    animation: "coding",
  },
  {
    id: 6,
    name: "Master Cat",
    commits: "501+ commits",
    commitRange: [501, 999],
    description: "Commit master! 👑",
    color: "#FFD700",
    animation: "glowing",
  },
]

// Simulate commit count function
function getSimulatedCommitCount(stage: number): number {
  const stageData = catStages[stage]
  const [min, max] = stageData.commitRange
  if (stage === 0) return 0
  if (stage === 6) return Math.floor(Math.random() * 500) + 501
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Helper function to draw pixel arrays
function drawPixelArray(
  ctx: CanvasRenderingContext2D,
  pixels: number[][],
  colors: string[],
  scale: number,
  offsetY = 0,
) {
  for (let y = 0; y < pixels.length; y++) {
    for (let x = 0; x < pixels[y].length; x++) {
      const colorIndex = pixels[y][x]
      if (colorIndex > 0) {
        ctx.fillStyle = colors[colorIndex]
        ctx.fillRect(x * scale, y * scale + offsetY, scale, scale)
      }
    }
  }
}

// Draw commit info cutely
function drawCommitInfo(ctx: CanvasRenderingContext2D, stage: number, commitCount: number, frame: number) {
  const catData = catStages[stage]

  // Background box
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
  ctx.fillRect(8, 8, 112, 24)
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
  ctx.fillRect(8, 8, 112, 2)
  ctx.fillRect(8, 8, 2, 24)

  // Commit icon
  ctx.font = "12px monospace"
  ctx.fillStyle = "#4CAF50"
  ctx.fillText("📊", 12, 24)

  // Commit count text
  ctx.font = "10px monospace"
  ctx.fillStyle = "#333333"
  ctx.fillText(`${commitCount} commits`, 28, 20)

  // Stage display
  ctx.font = "8px monospace"
  ctx.fillStyle = "#666666"
  ctx.fillText(`Lv.${stage}`, 28, 30)

  // Right badge
  ctx.fillStyle = catData.color
  ctx.fillRect(100, 12, 16, 8)
  ctx.fillStyle = "white"
  ctx.font = "6px monospace"
  ctx.fillText(`${stage}`, 104, 18)
}

// Sleeping cat
function drawSleepingCat(ctx: CanvasRenderingContext2D, scale: number, frame: number) {
  const pixels = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]

  const colors = ["transparent", "#A0A0A0", "#FFB6C1", "#000000", "#FF69B4"]
  drawPixelArray(ctx, pixels, colors, scale, 35)

  if (frame % 60 < 30) {
    ctx.font = "12px monospace"
    ctx.fillText("💤", 90, 50)
  }
}

// Baby cat
function drawBabyCat(ctx: CanvasRenderingContext2D, scale: number, frame: number, color: string) {
  const pixels = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]

  const colors = ["transparent", color, "#FFB6C1", "#000000", "#FF69B4"]

  if (frame % 120 < 8) {
    pixels[7][4] = 1
    pixels[7][11] = 1
  }

  drawPixelArray(ctx, pixels, colors, scale, 35)

  if (frame % 80 < 40) {
    ctx.font = "10px monospace"
    ctx.fillText("💕", 90, 45)
  }
}

// Curious cat
function drawCuriousCat(ctx: CanvasRenderingContext2D, scale: number, frame: number, color: string) {
  const pixels = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0],
  ]

  const colors = ["transparent", color, "#FFB6C1", "#000000", "#FF69B4", color]

  const tailWag = Math.sin(frame * 0.3) * 1
  pixels[15] = new Array(16).fill(0)
  const tailStart = Math.floor(6 + tailWag)
  for (let i = 0; i < 4; i++) {
    if (tailStart + i >= 0 && tailStart + i < 16) {
      pixels[15][tailStart + i] = 5
    }
  }

  drawPixelArray(ctx, pixels, colors, scale, 35)

  const ballX = 85 + Math.sin(frame * 0.1) * 8
  const ballY = 75
  ctx.fillStyle = "#FF6B6B"
  ctx.fillRect(ballX, ballY, scale, scale)
}

// Active cat
function drawActiveCat(ctx: CanvasRenderingContext2D, scale: number, frame: number, color: string) {
  const pixels = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0],
  ]

  const colors = ["transparent", color, "#FFB6C1", "#000000", "#FF69B4", color]
  const bounceY = Math.sin(frame * 0.4) * 4 + 35
  drawPixelArray(ctx, pixels, colors, scale, bounceY)

  if (frame % 30 < 15) {
    ctx.font = "10px monospace"
    ctx.fillText("💨", 85, 60)
  }
}

// Adult cat
function drawAdultCat(ctx: CanvasRenderingContext2D, scale: number, frame: number, color: string) {
  const pixels = [
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0],
  ]

  const colors = ["transparent", color, "#FFB6C1", "#000000", "#FF69B4", color]
  drawPixelArray(ctx, pixels, colors, scale, 35)

  if (frame % 120 < 60) {
    ctx.font = "10px monospace"
    ctx.fillText("🌿", 85, 45)
  }
}

// Developer cat
function drawDeveloperCat(ctx: CanvasRenderingContext2D, scale: number, frame: number, color: string) {
  const pixels = [
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 5, 5, 3, 5, 5, 1, 1, 5, 5, 3, 5, 5, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0],
  ]

  const colors = ["transparent", color, "#FFB6C1", "#000000", "#FF69B4", "#000000", color]
  drawPixelArray(ctx, pixels, colors, scale, 35)

  ctx.fillStyle = "#404040"
  ctx.fillRect(35, 85, 40, 12)
  ctx.fillStyle = frame % 30 < 15 ? "#00FF00" : "#008000"
  ctx.fillRect(37, 87, 36, 6)

  if (frame % 40 < 20) {
    ctx.font = "8px monospace"
    ctx.fillText("⌨️", 85, 85)
  }
}

// Master cat
function drawMasterCat(ctx: CanvasRenderingContext2D, scale: number, frame: number) {
  const pixels = [
    [0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
    [0, 0, 6, 6, 7, 6, 7, 6, 6, 7, 6, 7, 6, 0, 0, 0],
    [0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0],
  ]

  const colors = ["transparent", "#FFD700", "#FFB6C1", "#000000", "#FF69B4", "#FFD700", "#FFD700", "#FF0000"]
  drawPixelArray(ctx, pixels, colors, scale, 35)

  ctx.shadowColor = "#FFD700"
  ctx.shadowBlur = 8
  ctx.fillStyle = "rgba(255, 215, 0, 0.1)"
  ctx.fillRect(0, 35, 128, 80)
  ctx.shadowBlur = 0

  const sparkles = ["✨", "⭐", "💫"]
  sparkles.forEach((sparkle, i) => {
    if ((frame + i * 20) % 60 < 30) {
      ctx.font = "10px monospace"
      ctx.fillText(sparkle, 85 + i * 5, 45 + i * 3)
    }
  })
}

// Main drawing function
function drawPixelCat(ctx: CanvasRenderingContext2D, stage: number, frame = 0, commitCount?: number) {
  const scale = 8
  const catData = catStages[stage]

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.imageSmoothingEnabled = false

  const actualCommits = commitCount ?? getSimulatedCommitCount(stage)

  switch (stage) {
    case 0:
      drawSleepingCat(ctx, scale, frame)
      break
    case 1:
      drawBabyCat(ctx, scale, frame, catData.color)
      break
    case 2:
      drawCuriousCat(ctx, scale, frame, catData.color)
      break
    case 3:
      drawActiveCat(ctx, scale, frame, catData.color)
      break
    case 4:
      drawAdultCat(ctx, scale, frame, catData.color)
      break
    case 5:
      drawDeveloperCat(ctx, scale, frame, catData.color)
      break
    case 6:
      drawMasterCat(ctx, scale, frame)
      break
  }

  drawCommitInfo(ctx, stage, actualCommits, frame)
}

interface GitHubData {
  username: string
  commitCount: number
  catStage: number
  year: number
}

export default function GifGenerator() {
  const [selectedStage, setSelectedStage] = useState(1)
  const [username, setUsername] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [githubData, setGithubData] = useState<GitHubData | null>(null)
  const [error, setError] = useState<string>("")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => prev + 1)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")!
      const commitCount = githubData?.commitCount
      drawPixelCat(ctx, selectedStage, currentFrame, commitCount)
    }
  }, [selectedStage, currentFrame, githubData])

  const fetchGitHubData = async () => {
    if (!username.trim()) {
      setError("Please enter a GitHub username")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/github/${username}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch GitHub data")
      }

      setGithubData(data)
      setSelectedStage(data.catStage)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setGithubData(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateGif = async () => {
    if (!githubData) {
      alert("Please fetch GitHub data first! 🐱")
      return
    }

    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 실제 GitHub 데이터를 기반으로 한 URL 생성
    const gifUrl = `https://gitpaws.vercel.app/api/cat/${githubData.username}`
    navigator.clipboard.writeText(`![GitPaws Cat](${gifUrl})`)
    setIsGenerating(false)
    alert(`Your ${catStages[githubData.catStage].name} has been adopted! 🐱💕\nMarkdown code copied to clipboard!`)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            🐾 GitPaws 🐾
          </CardTitle>
          <CardDescription className="text-lg">
            Your coding journey visualized through adorable pixel cats!
            <br />
            <span className="text-pink-500 font-medium">Adopt your purr-fect coding companion! 🥰</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 mb-4 flex items-center justify-center relative">
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={128}
                  height={128}
                  className="pixel-art border-2 border-gray-300 rounded shadow-lg"
                  style={{ imageRendering: "pixelated" }}
                />
                <div className="absolute -bottom-2 -right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded animate-pulse">
                  {githubData ? "REAL" : "DEMO"}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{catStages[selectedStage].name}</h3>
              <Badge variant="secondary" className="text-sm">
                {githubData ? `${githubData.commitCount} commits this year` : catStages[selectedStage].commits}
              </Badge>
              <p className="text-gray-600">{catStages[selectedStage].description}</p>
              {githubData && (
                <p className="text-sm text-green-600 font-medium">
                  ✨ Real data from @{githubData.username} ({githubData.year})
                </p>
              )}
              {!githubData && (
                <p className="text-sm text-orange-600 font-medium">
                  👆 This is a demo! Enter your GitHub username to see your real cat!
                </p>
              )}
            </div>
          </div>

          <div className="mb-6 max-w-md mx-auto space-y-4">
            <div>
              <Label htmlFor="username" className="text-sm font-medium">
                GitHub Username
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="username"
                  type="text"
                  placeholder="your-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && fetchGitHubData()}
                />
                <Button onClick={fetchGitHubData} disabled={isLoading} variant="outline">
                  {isLoading ? "Loading..." : "Fetch"}
                </Button>
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          </div>

          <div className="text-center mb-6">
            <Button
              onClick={handleGenerateGif}
              disabled={!githubData || isGenerating}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105"
            >
              {isGenerating ? "Preparing your cat..." : "🐱 Adopt This Cat"}
            </Button>
            {!githubData && (
              <p className="text-sm text-gray-500 mt-2">
                Please fetch your GitHub data first to adopt your real cat! 🐾
              </p>
            )}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {catStages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => !githubData && setSelectedStage(stage.id)}
                disabled={!!githubData}
                className={`p-3 rounded-lg border-2 transition-all ${
                  githubData ? "opacity-50 cursor-not-allowed" : "transform hover:scale-105"
                } ${
                  selectedStage === stage.id
                    ? "border-pink-500 bg-pink-50 shadow-lg"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className="w-8 h-8 mx-auto mb-2 rounded border shadow-sm"
                  style={{ backgroundColor: stage.color }}
                ></div>
                <div className="text-xs font-medium">{stage.name}</div>
                <div className="text-xs text-gray-500">{stage.commits}</div>
              </button>
            ))}
          </div>
          {githubData && (
            <p className="text-center text-sm text-gray-500 mt-2">
              Cat selection is disabled when using real GitHub data 🐱
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>📝 Add Your Cat to README</CardTitle>
          <CardDescription>Copy the markdown code and paste it into your README file</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
            <code>![My GitPaws Cat](https://gitpaws.vercel.app/api/cat/your-username)</code>
          </div>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>
              • Replace <code>your-username</code> with your actual GitHub username
            </p>
            <p>• Your cat will automatically grow as you commit more code</p>
            <p>• The more you code, the cuter your cat becomes! 🐱💕</p>
            <p className="text-orange-600 font-medium">
              ⚠️ Note: Image generation API is not deployed yet. Coming soon!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
