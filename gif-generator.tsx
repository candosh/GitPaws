"use client"

import { useState, useRef, useEffect } from "react"

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

    // SVG 이미지 URL 생성
    const imageUrl = `https://gitpaws.vercel.app/api/cat/image/${githubData.username}`
    navigator.clipboard.writeText(`![GitPaws Cat](${imageUrl})`)
    setIsGenerating(false)
    alert(`Your ${catStages[githubData.catStage].name} has been adopted! 🐱💕\nMarkdown code copied to clipboard!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🐾 GitPaws 🐾
          </h1>
          <p className="text-lg text-gray-600 mb-6">Your coding journey visualized through adorable pixel cats!</p>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-center mb-4">
              <canvas
                ref={canvasRef}
                width={128}
                height={128}
                className="pixel-art border-2 border-gray-200 rounded-lg"
              />
            </div>

            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                  {githubData ? "REAL" : "DEMO"}
                </span>
                <h3 className="text-xl font-bold">{catStages[selectedStage].name}</h3>
              </div>
              <p className="text-gray-600">
                {githubData ? `${githubData.commitCount} commits this year` : catStages[selectedStage].commits}
              </p>
              <p className="text-sm text-gray-500">{catStages[selectedStage].description}</p>
              {githubData && (
                <p className="text-xs text-green-600 font-medium">
                  ✨ Real data from @{githubData.username} ({githubData.year})
                </p>
              )}
            </div>

            {!githubData && (
              <div className="mt-6 flex gap-2">
                <input
                  type="text"
                  placeholder="your-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && fetchGitHubData()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={fetchGitHubData}
                  disabled={isLoading}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                >
                  {isLoading ? "Loading..." : "Fetch"}
                </button>
              </div>
            )}

            {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}

            <button
              onClick={handleGenerateGif}
              disabled={isGenerating}
              className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 transition-all"
            >
              {isGenerating ? "Preparing your cat..." : "🐱 Adopt This Cat"}
            </button>

            {!githubData && (
              <p className="mt-2 text-xs text-gray-500 text-center">
                Please fetch your GitHub data first to adopt your real cat! 🐾
              </p>
            )}
          </div>

          <div className="grid grid-cols-7 gap-2 mb-6">
            {catStages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => !githubData && setSelectedStage(stage.id)}
                disabled={githubData}
                className={`p-2 rounded-lg border-2 transition-all ${
                  selectedStage === stage.id
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                } ${githubData ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="text-center">
                  <div className="text-xs font-medium">{stage.name}</div>
                  <div className="text-xs text-gray-500">{stage.commits}</div>
                </div>
              </button>
            ))}
          </div>
          {githubData && (
            <p className="text-sm text-gray-500 text-center mb-6">
              Cat selection is disabled when using real GitHub data 🐱
            </p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2 text-center">📝 Add Your Cat to README</h2>
          <p className="text-gray-600 text-center mb-4">Copy the markdown code and paste it into your README file</p>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm mb-4">
            <code>![GitPaws Cat](https://gitpaws.vercel.app/api/cat/image/your-username)</code>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              • Replace <code>your-username</code> with your actual GitHub username
            </p>
            <p>• Your cat will automatically grow as you commit more code</p>
            <p>• The more you code, the cuter your cat becomes! 🐱💕</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="mb-4">
            <p className="text-lg font-medium text-gray-800 mb-2">
              Made with 💜 by{" "}
              <a
                href="https://github.com/candosh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                candosh
              </a>
            </p>
            <p className="text-gray-600">Transform your GitHub commits into adorable pixel cats! 🐱✨</p>
          </div>
        </div>
      </div>
    </div>
  )
}
