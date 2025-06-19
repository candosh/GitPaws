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
    name: "잠자는 고양이",
    commits: "0개",
    commitRange: [0, 0],
    description: "커밋 활동이 없어요",
    color: "#A0A0A0",
    animation: "sleeping",
  },
  {
    id: 1,
    name: "아기 고양이",
    commits: "1-25개",
    commitRange: [1, 25],
    description: "개발을 시작했어요!",
    color: "#FFB366",
    animation: "blinking",
  },
  {
    id: 2,
    name: "호기심 고양이",
    commits: "26-75개",
    commitRange: [26, 75],
    description: "코딩이 재미있어요",
    color: "#FF9A56",
    animation: "playing",
  },
  {
    id: 3,
    name: "활발한 고양이",
    commits: "76-150개",
    commitRange: [76, 150],
    description: "열심히 개발 중이에요",
    color: "#D2691E",
    animation: "bouncing",
  },
  {
    id: 4,
    name: "성묘",
    commits: "151-300개",
    commitRange: [151, 300],
    description: "안정적인 개발자예요",
    color: "#8B7D6B",
    animation: "sitting",
  },
  {
    id: 5,
    name: "개발자 고양이",
    commits: "301-500개",
    commitRange: [301, 500],
    description: "진짜 개발자가 되었어요",
    color: "#696969",
    animation: "coding",
  },
  {
    id: 6,
    name: "마스터 고양이",
    commits: "501개+",
    commitRange: [501, 999],
    description: "커밋의 대가입니다!",
    color: "#FFD700",
    animation: "glowing",
  },
]

// 커밋 수 시뮬레이션 함수
function getSimulatedCommitCount(stage: number): number {
  const stageData = catStages[stage]
  const [min, max] = stageData.commitRange
  if (stage === 0) return 0
  if (stage === 6) return Math.floor(Math.random() * 500) + 501
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 픽셀 배열을 그리는 헬퍼 함수
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

// 커밋 정보를 귀엽게 표시하는 함수
function drawCommitInfo(ctx: CanvasRenderingContext2D, stage: number, commitCount: number, frame: number) {
  const catData = catStages[stage]

  // 배경 박스
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
  ctx.fillRect(8, 8, 112, 24)
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
  ctx.fillRect(8, 8, 112, 2)
  ctx.fillRect(8, 8, 2, 24)

  // 커밋 아이콘
  ctx.font = "12px monospace"
  ctx.fillStyle = "#4CAF50"
  ctx.fillText("📊", 12, 24)

  // 커밋 수 텍스트
  ctx.font = "10px monospace"
  ctx.fillStyle = "#333333"
  ctx.fillText(`${commitCount} commits`, 28, 20)

  // 단계 표시
  ctx.font = "8px monospace"
  ctx.fillStyle = "#666666"
  ctx.fillText(`Lv.${stage}`, 28, 30)

  // 우측 뱃지
  ctx.fillStyle = catData.color
  ctx.fillRect(100, 12, 16, 8)
  ctx.fillStyle = "white"
  ctx.font = "6px monospace"
  ctx.fillText(`${stage}`, 104, 18)
}

// 잠자는 고양이
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

// 아기 고양이
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

// 호기심 고양이
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

// 활발한 고양이
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

// 성묘
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

// 개발자 고양이
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

// 마스터 고양이
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

// 메인 그리기 함수
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

export default function GifGenerator() {
  const [selectedStage, setSelectedStage] = useState(1)
  const [username, setUsername] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)
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
      drawPixelCat(ctx, selectedStage, currentFrame)
    }
  }, [selectedStage, currentFrame])

  const handleGenerateGif = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const gifUrl = `https://commit-cat.vercel.app/api/gif/${username}?stage=${selectedStage}`
    navigator.clipboard.writeText(`![Commit Cat](${gifUrl})`)
    setIsGenerating(false)
    alert("고양이가 분양되었고 마크다운 코드가 클립보드에 복사되었습니다! 🐱💕")
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">🐈GitPaw🐈‍⬛</CardTitle>
          <CardDescription>
            Commit 수에 따라 고양이가 달라져요!
            <br />
            귀여운 고양이 분양해가세요! 🥰
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
                  LIVE
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{catStages[selectedStage].name}</h3>
              <Badge variant="secondary" className="text-sm">
                연간 커밋: {catStages[selectedStage].commits}
              </Badge>
              <p className="text-gray-600">{catStages[selectedStage].description}</p>
            </div>
          </div>

          <div className="mb-6 max-w-md mx-auto">
            <Label htmlFor="username" className="text-sm font-medium">
              GitHub 사용자명
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="your-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="text-center mb-6">
            <Button
              onClick={handleGenerateGif}
              disabled={!username || isGenerating}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105"
            >
              {isGenerating ? "고양이 준비 중..." : "🐱 고양이 분양하기"}
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {catStages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`p-3 rounded-lg border-2 transition-all transform hover:scale-105 ${
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>📝 README에 고양이 입양하기</CardTitle>
          <CardDescription>마크다운 코드를 복사해서 README 파일에 붙여넣으세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
            <code>![My Commit Cat](https://commit-cat.vercel.app/api/cat/your-username)</code>
          </div>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>
              • <code>your-username</code>을 실제 GitHub 사용자명으로 변경하세요
            </p>
            <p>• 고양이는 매일 자동으로 성장합니다</p>
            <p>• 커밋할수록 더 귀여운 고양이가 됩니다! 🐱💕</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
