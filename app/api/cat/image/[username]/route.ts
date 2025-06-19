import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  try {
    const { username } = params

    // GitHub 데이터 가져오기
    const githubResponse = await fetch(`${request.nextUrl.origin}/api/cat/${username}`)
    const githubData = await githubResponse.json()

    // 픽셀 아트 SVG 이미지 생성
    const svg = generatePixelCatSVG(githubData)

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch (error) {
    console.error("Image generation error:", error)

    // 에러 SVG 반환
    const errorSvg = generateErrorSVG()
    return new NextResponse(errorSvg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=300",
      },
    })
  }
}

function generatePixelCatSVG(data: any): string {
  const { username, commitCount, catStage } = data

  const catNames = [
    "Sleepy Cat",
    "Baby Kitten",
    "Curious Kitten",
    "Active Cat",
    "Adult Cat",
    "Developer Cat",
    "Master Cat",
  ]

  const name = catNames[catStage] || "Unknown Cat"

  // 픽셀 아트 고양이 생성
  const catPixelArt = generateCatPixelArt(catStage)

  return `
    <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="400" height="200" fill="#f8fafc"/>
      <rect x="10" y="10" width="380" height="180" fill="white" stroke="#e5e7eb" stroke-width="2" rx="12"/>
      
      <!-- Pixel Cat -->
      ${catPixelArt}
      
      <!-- Info Panel -->
      <rect x="200" y="30" width="180" height="140" fill="rgba(255,255,255,0.9)" stroke="#e5e7eb" rx="8"/>
      
      <!-- Username -->
      <text x="210" y="55" font-family="monospace" font-size="20" font-weight="bold" fill="#1f2937">@${username}</text>
      
      <!-- Cat Name -->
      <text x="210" y="80" font-family="monospace" font-size="16" fill="#374151">${name}</text>
      
      <!-- Commit Count -->
      <text x="210" y="105" font-family="monospace" font-size="14" fill="#6b7280">${commitCount} commits</text>
      
      <!-- Level -->
      <rect x="210" y="115" width="60" height="20" fill="${getCatColor(catStage)}" rx="10"/>
      <text x="240" y="128" font-family="monospace" font-size="12" fill="white" text-anchor="middle">Lv.${catStage}</text>
      
      <!-- Branding -->
      <text x="290" y="165" font-family="monospace" font-size="10" fill="#9ca3af" text-anchor="middle">GitPaws 🐾</text>
      
      <!-- Special effects for high levels -->
      ${catStage >= 5 ? generateSparkles() : ""}
      ${catStage === 6 ? generateCrown() : ""}
    </svg>
  `
}

function getCatColor(stage: number): string {
  const colors = ["#A0A0A0", "#FFB366", "#FF9A56", "#D2691E", "#8B7D6B", "#696969", "#FFD700"]
  return colors[stage] || "#FFB366"
}

function generateCatPixelArt(stage: number): string {
  const scale = 8
  const offsetX = 30
  const offsetY = 40

  switch (stage) {
    case 0:
      return generateSleepingCat(scale, offsetX, offsetY)
    case 1:
      return generateBabyCat(scale, offsetX, offsetY)
    case 2:
      return generateCuriousCat(scale, offsetX, offsetY)
    case 3:
      return generateActiveCat(scale, offsetX, offsetY)
    case 4:
      return generateAdultCat(scale, offsetX, offsetY)
    case 5:
      return generateDeveloperCat(scale, offsetX, offsetY)
    case 6:
      return generateMasterCat(scale, offsetX, offsetY)
    default:
      return generateBabyCat(scale, offsetX, offsetY)
  }
}

function generateSleepingCat(scale: number, offsetX: number, offsetY: number): string {
  const color = "#A0A0A0"
  return `
    <!-- Sleeping Cat -->
    <!-- Body -->
    <ellipse cx="${offsetX + 8 * scale}" cy="${offsetY + 10 * scale}" rx="${6 * scale}" ry="${4 * scale}" fill="${color}"/>
    <!-- Head -->
    <circle cx="${offsetX + 8 * scale}" cy="${offsetY + 6 * scale}" r="${4 * scale}" fill="${color}"/>
    <!-- Ears -->
    <circle cx="${offsetX + 6 * scale}" cy="${offsetY + 3 * scale}" r="${1.5 * scale}" fill="${color}"/>
    <circle cx="${offsetX + 10 * scale}" cy="${offsetY + 3 * scale}" r="${1.5 * scale}" fill="${color}"/>
    <circle cx="${offsetX + 6 * scale}" cy="${offsetY + 3 * scale}" r="${scale}" fill="#FFB6C1"/>
    <circle cx="${offsetX + 10 * scale}" cy="${offsetY + 3 * scale}" r="${scale}" fill="#FFB6C1"/>
    <!-- Closed Eyes -->
    <line x1="${offsetX + 6.5 * scale}" y1="${offsetY + 5.5 * scale}" x2="${offsetX + 7.5 * scale}" y2="${offsetY + 5.5 * scale}" stroke="black" stroke-width="2"/>
    <line x1="${offsetX + 8.5 * scale}" y1="${offsetY + 5.5 * scale}" x2="${offsetX + 9.5 * scale}" y2="${offsetY + 5.5 * scale}" stroke="black" stroke-width="2"/>
    <!-- Nose -->
    <circle cx="${offsetX + 8 * scale}" cy="${offsetY + 6.5 * scale}" r="${0.5 * scale}" fill="#ff69b4"/>
    <!-- ZZZ -->
    <text x="${offsetX + 12 * scale}" y="${offsetY + 3 * scale}" font-family="monospace" font-size="12" fill="#666">💤</text>
  `
}

function generateBabyCat(scale: number, offsetX: number, offsetY: number): string {
  const color = "#FFB366"
  return `
    <!-- Baby Cat -->
    <!-- Body -->
    <ellipse cx="${offsetX + 8 * scale}" cy="${offsetY + 10 * scale}" rx="${5 * scale}" ry="${3.5 * scale}" fill="${color}"/>
    <!-- Head -->
    <circle cx="${offsetX + 8 * scale}" cy="${offsetY + 6 * scale}" r="${3.5 * scale}" fill="${color}"/>
    <!-- Ears -->
    <circle cx="${offsetX + 6 * scale}" cy="${offsetY + 3 * scale}" r="${1.5 * scale}" fill="${color}"/>
    <circle cx="${offsetX + 10 * scale}" cy="${offsetY + 3 * scale}" r="${1.5 * scale}" fill="${color}"/>
    <circle cx="${offsetX + 6 * scale}" cy="${offsetY + 3 * scale}" r="${scale}" fill="#FFB6C1"/>
    <circle cx="${offsetX + 10 * scale}" cy="${offsetY + 3 * scale}" r="${scale}" fill="#FFB6C1"/>
    <!-- Big Eyes -->
    <circle cx="${offsetX + 6.5 * scale}" cy="${offsetY + 5.5 * scale}" r="${scale}" fill="black"/>
    <circle cx="${offsetX + 9.5 * scale}" cy="${offsetY + 5.5 * scale}" r="${scale}" fill="black"/>
    <circle cx="${offsetX + 6.8 * scale}" cy="${offsetY + 5.2 * scale}" r="${0.5 * scale}" fill="white"/>
    <circle cx="${offsetX + 9.8 * scale}" cy="${offsetY + 5.2 * scale}" r="${0.5 * scale}" fill="white"/>
    <!-- Nose -->
    <circle cx="${offsetX + 8 * scale}" cy="${offsetY + 6.5 * scale}" r="${0.5 * scale}" fill="#ff69b4"/>
    <!-- Mouth -->
    <path d="M ${offsetX + 7.5 * scale} ${offsetY + 7 * scale} Q ${offsetX + 8 * scale} ${offsetY + 7.5 * scale} ${offsetX + 8.5 * scale} ${offsetY + 7 * scale}" stroke="#ff69b4" stroke-width="1" fill="none"/>
    <!-- Heart -->
    <text x="${offsetX + 12 * scale}" y="${offsetY + 4 * scale}" font-family="monospace" font-size="10" fill="#ff69b4">💕</text>
  `
}

function generateCuriousCat(scale: number, offsetX: number, offsetY: number): string {
  const color = "#FF9A56"
  return `
    <!-- Curious Cat -->
    <!-- Body -->
    <ellipse cx="${offsetX + 8 * scale}" cy="${offsetY + 10 * scale}" rx="${5.5 * scale}" ry="${4 * scale}" fill="${color}"/>
    <!-- Head -->
    <circle cx="${offsetX + 8 * scale}" cy="${offsetY + 6 * scale}" r="${4 * scale}" fill="${color}"/>
    <!-- Ears -->
    <circle cx="${offsetX + 5.5 * scale}" cy="${offsetY + 3 * scale}" r="${1.5 * scale}" fill="${color}"/>
    <circle cx="${offsetX + 10.5 * scale}" cy="${offsetY + 3 * scale}" r="${1.5 * scale}" fill="${color}"/>
    <circle cx="${offsetX + 5.5 * scale}" cy="${offsetY + 3 * scale}" r="${scale}" fill="#FFB6C1"/>
    <circle cx="${offsetX + 10.5 * scale}" cy="${offsetY + 3 * scale}" r="${scale}" fill="#FFB6C1"/>
    <!-- Curious Eyes -->
    <circle cx="${offsetX + 6.5 * scale}" cy="${offsetY + 5.5 * scale}" r="${1.2 * scale}" fill="black"/>
    <circle cx="${offsetX + 9.5 * scale}" cy="${offsetY + 5.5 * scale}" r="${1.2 * scale}" fill="black"/>
    <circle cx="${offsetX + 6.8 * scale}" cy="${offsetY + 5.2 * scale}" r="${0.6 * scale}" fill="white"/>
    <circle cx="${offsetX + 9.8 * scale}" cy="${offsetY + 5.2 * scale}" r="${0.6 * scale}" fill="white"/>
    <!-- Nose -->
    <circle cx="${offsetX + 8 * scale}" cy="${offsetY + 6.8 * scale}" r="${0.6 * scale}" fill="#ff69b4"/>
    <!-- Tail wagging -->
    <ellipse cx="${offsetX + 2 * scale}" cy="${offsetY + 12 * scale}" rx="${3 * scale}" ry="${1 * scale}" fill="${color}" transform="rotate(-20 ${offsetX + 2 * scale} ${offsetY + 12 * scale})"/>
    <!-- Ball -->
    <circle cx="${offsetX + 13 * scale}" cy="${offsetY + 12 * scale}" r="${scale}" fill="#FF6B6B"/>
  `
}

function generateActiveCat(scale: number, offsetX: number, offsetY: number): string {
  const color = "#D2691E"
  return `
    <!-- Active Cat -->
    <!-- Body (jumping) -->
    <ellipse cx="${offsetX + 8 * scale}" cy="${offsetY + 9 * scale}" rx="${5.5 * scale}" ry="${4 * scale}" fill="${color}"/>
    <!-- Head -->
    <circle cx="${offsetX + 8 * scale}" cy="${offsetY + 5 * scale}" r="${4 * scale}" fill="${color}"/>
    <!-- Ears -->
    <circle cx="${offsetX + 5.5 * scale}" cy="${offsetY + 2 * scale}" r="${1.5 * scale}" fill="${color}"/>
    <circle cx="${offsetX + 10.5 * scale}" cy="${offsetY + 2 * scale}" r="${1.5 * scale}" fill="${color}"/>
    <circle cx="${offsetX + 5.5 * scale}" cy="${offsetY + 2 * scale}" r="${scale}" fill="#FFB6C1"/>
    <circle cx="${offsetX + 10.5 * scale}" cy="${offsetY + 2 * scale}" r="${scale}" fill="#FFB6C1"/>
    <!-- Excited Eyes -->
    <circle cx="${offsetX + 6.5 * scale}" cy="${offsetY + 4.5 * scale}" r="${1.2 * scale}" fill="black"/>
    <circle cx="${offsetX + 9.5 * scale}" cy="${offsetY + 4.5 * scale}" r="${1.2 * scale}" fill="black"/>
    <circle cx="${offsetX + 6.8 * scale}" cy="${offsetY + 4.2 * scale}" r="${0.6 * scale}" fill="white"/>
    <circle cx="${offsetX + 9.8 * scale}" cy="${offsetY + 4.2 * scale}" r="${0.6 * scale}" fill="white"/>
    <!-- Nose -->
    <circle cx="${offsetX + 8 * scale}" cy="${offsetY + 5.8 * scale}" r="${0.6 * scale}" fill="#ff69b4"/>
    <!-- Motion lines -->
    <text x="${offsetX + 12 * scale}" y="${offsetY + 6 * scale}" font-family="monospace" font-size="12" fill="#4CAF50">💨</text>
    <!-- Legs in jumping position -->
    <ellipse cx="${offsetX + 5 * scale}" cy="${offsetY + 12 * scale}" rx="${1 * scale}" ry="${2 * scale}" fill="${color}"/>
    <ellipse cx="${offsetX + 11 * scale}" cy="${offsetY + 12 * scale}" rx="${1 * scale}" ry="${2 * scale}" fill="${color}"/>
  `
}

function generateAdultCat(scale: number, offsetX: number, offsetY: number): string {
  const color = "#8B7D6B"
  return `
    <!-- Adult Cat -->
    <!-- Body -->
    <ellipse cx="${offsetX + 8 * scale}" cy="${offsetY + 10 * scale}" rx="${6 * scale}" ry="${4.5 * scale}" fill="${color}"/>
    <!-- Head -->
    <circle cx="${offsetX + 8 * scale}" cy="${offsetY + 6 * scale}" r="${4.5 * scale}" fill="${color}"/>
    <!-- Ears -->
    <circle cx="${offsetX + 5 * scale}" cy="${offsetY + 2.5 * scale}" r="${2 * scale}" fill="${color}"/>
    <circle cx="${offsetX + 11 * scale}" cy="${offsetY + 2.5 * scale}" r="${2 * scale}" fill="${color}"/>
    <circle cx="${offsetX + 5 * scale}" cy="${offsetY + 2.5 * scale}" r="${1.2 * scale}" fill="#FFB6C1"/>
    <circle cx="${offsetX + 11 * scale}" cy="${offsetY + 2.5 * scale}" r="${1.2 * scale}" fill="#FFB6C1"/>
    <!-- Wise Eyes -->
    <circle cx="${offsetX + 6.5 * scale}" cy="${offsetY + 5.5 * scale}" r="${1.3 * scale}" fill="black"/>
    <circle cx="${offsetX + 9.5 * scale}" cy="${offsetY + 5.5 * scale}" r="${1.3 * scale}" fill="black"/>
    <circle cx="${offsetX + 6.8 * scale}" cy="${offsetY + 5.2 * scale}" r="${0.7 * scale}" fill="white"/>
    <circle cx="${offsetX + 9.8 * scale}" cy="${offsetY + 5.2 * scale}" r="${0.7 * scale}" fill="white"/>
    <!-- Nose -->
    <circle cx="${offsetX + 8 * scale}" cy="${offsetY + 7 * scale}" r="${0.7 * scale}" fill="#ff69b4"/>
    <!-- Whiskers -->
    <line x1="${offsetX + 4 * scale}" y1="${offsetY + 6.5 * scale}" x2="${offsetX + 6 * scale}" y2="${offsetY + 6.5 * scale}" stroke="black" stroke-width="1"/>
    <line x1="${offsetX + 10 * scale}" y1="${offsetY + 6.5 * scale}" x2="${offsetX + 12 * scale}" y2="${offsetY + 6.5 * scale}" stroke="black" stroke-width="1"/>
    <!-- Peaceful expression -->
    <text x="${offsetX + 13 * scale}" y="${offsetY + 4 * scale}" font-family="monospace" font-size="10" fill="#4CAF50">🌿</text>
  `
}

function generateDeveloperCat(scale: number, offsetX: number, offsetY: number): string {
  const color = "#696969"
  return `
    <!-- Developer Cat -->
    <!-- Body -->
    <ellipse cx="${offsetX + 8 * scale}" cy="${offsetY + 10 * scale}" rx="${5.5 * scale}" ry="${4 * scale}" fill="${color}"/>
    <!-- Head -->
    <circle cx="${offsetX + 8 * scale}" cy="${offsetY + 6 * scale}" r="${4 * scale}" fill="${color}"/>
    <!-- Ears -->
    <circle cx="${offsetX + 5.5 * scale}" cy="${offsetY + 3 * scale}" r="${1.5 * scale}" fill="${color}"/>
    <circle cx="${offsetX + 10.5 * scale}" cy="${offsetY + 3 * scale}" r="${1.5 * scale}" fill="${color}"/>
    <circle cx="${offsetX + 5.5 * scale}" cy="${offsetY + 3 * scale}" r="${scale}" fill="#FFB6C1"/>
    <circle cx="${offsetX + 10.5 * scale}" cy="${offsetY + 3 * scale}" r="${scale}" fill="#FFB6C1"/>
    <!-- Glasses -->
    <rect x="${offsetX + 4.5 * scale}" y="${offsetX + 4.5 * scale}" width="${7 * scale}" height="${3 * scale}" fill="none" stroke="black" stroke-width="2" rx="1"/>
    <circle cx="${offsetX + 6 * scale}" cy="${offsetY + 5.5 * scale}" r="${1.5 * scale}" fill="rgba(255,255,255,0.3)" stroke="black" stroke-width="1"/>
    <circle cx="${offsetX + 10 * scale}" cy="${offsetY + 5.5 * scale}" r="${1.5 * scale}" fill="rgba(255,255,255,0.3)" stroke="black" stroke-width="1"/>
    <!-- Eyes behind glasses -->
    <circle cx="${offsetX + 6 * scale}" cy="${offsetY + 5.5 * scale}" r="${0.8 * scale}" fill="black"/>
    <circle cx="${offsetX + 10 * scale}" cy="${offsetY + 5.5 * scale}" r="${0.8 * scale}" fill="black"/>
    <!-- Nose -->
    <circle cx="${offsetX + 8 * scale}" cy="${offsetY + 6.8 * scale}" r="${0.6 * scale}" fill="#ff69b4"/>
    <!-- Laptop -->
    <rect x="${offsetX + 4 * scale}" y="${offsetY + 13 * scale}" width="${8 * scale}" height="${3 * scale}" fill="#333" rx="1"/>
    <rect x="${offsetX + 4.5 * scale}" y="${offsetY + 13.5 * scale}" width="${7 * scale}" height="${2 * scale}" fill="#00FF00" rx="0.5"/>
    <!-- Code symbol -->
    <text x="${offsetX + 13 * scale}" y="${offsetY + 8 * scale}" font-family="monospace" font-size="10" fill="#00FF00">💻</text>
  `
}

function generateMasterCat(scale: number, offsetX: number, offsetY: number): string {
  const color = "#FFD700"
  return `
    <!-- Master Cat -->
    <!-- Glow effect -->
    <circle cx="${offsetX + 8 * scale}" cy="${offsetY + 8 * scale}" r="${8 * scale}" fill="rgba(255,215,0,0.2)"/>
    <!-- Body -->
    <ellipse cx="${offsetX + 8 * scale}" cy="${offsetY + 10 * scale}" rx="${6 * scale}" ry="${4.5 * scale}" fill="${color}"/>
    <!-- Head -->
    <circle cx="${offsetX + 8 * scale}" cy="${offsetY + 6 * scale}" r="${4.5 * scale}" fill="${color}"/>
    <!-- Crown -->
    <polygon points="${offsetX + 6 * scale},${offsetY + 1 * scale} ${offsetX + 8 * scale},${offsetY - 1 * scale} ${offsetX + 10 * scale},${offsetY + 1 * scale} ${offsetX + 9 * scale},${offsetY + 2 * scale} ${offsetX + 7 * scale},${offsetY + 2 * scale}" fill="#FFD700" stroke="#FFA500" stroke-width="1"/>
    <circle cx="${offsetX + 8 * scale}" cy="${offsetY + 0.5 * scale}" r="${0.8 * scale}" fill="#FF0000"/>
    <!-- Ears -->
    <circle cx="${offsetX + 5 * scale}" cy="${offsetY + 2.5 * scale}" r="${2 * scale}" fill="${color}"/>
    <circle cx="${offsetX + 11 * scale}" cy="${offsetY + 2.5 * scale}" r="${2 * scale}" fill="${color}"/>
    <circle cx="${offsetX + 5 * scale}" cy="${offsetY + 2.5 * scale}" r="${1.2 * scale}" fill="#FFB6C1"/>
    <circle cx="${offsetX + 11 * scale}" cy="${offsetY + 2.5 * scale}" r="${1.2 * scale}" fill="#FFB6C1"/>
    <!-- Majestic Eyes -->
    <circle cx="${offsetX + 6.5 * scale}" cy="${offsetY + 5.5 * scale}" r="${1.5 * scale}" fill="black"/>
    <circle cx="${offsetX + 9.5 * scale}" cy="${offsetY + 5.5 * scale}" r="${1.5 * scale}" fill="black"/>
    <circle cx="${offsetX + 6.8 * scale}" cy="${offsetY + 5.2 * scale}" r="${0.8 * scale}" fill="cyan"/>
    <circle cx="${offsetX + 9.8 * scale}" cy="${offsetY + 5.2 * scale}" r="${0.8 * scale}" fill="cyan"/>
    <circle cx="${offsetX + 7 * scale}" cy="${offsetY + 5 * scale}" r="${0.3 * scale}" fill="white"/>
    <circle cx="${offsetX + 10 * scale}" cy="${offsetY + 5 * scale}" r="${0.3 * scale}" fill="white"/>
    <!-- Nose -->
    <circle cx="${offsetX + 8 * scale}" cy="${offsetY + 7 * scale}" r="${0.7 * scale}" fill="#ff69b4"/>
    <!-- Golden whiskers -->
    <line x1="${offsetX + 3.5 * scale}" y1="${offsetY + 6.5 * scale}" x2="${offsetX + 5.5 * scale}" y2="${offsetY + 6.5 * scale}" stroke="#FFD700" stroke-width="2"/>
    <line x1="${offsetX + 10.5 * scale}" y1="${offsetY + 6.5 * scale}" x2="${offsetX + 12.5 * scale}" y2="${offsetY + 6.5 * scale}" stroke="#FFD700" stroke-width="2"/>
  `
}

function generateSparkles(): string {
  return `
    <text x="50" y="40" font-family="monospace" font-size="14" fill="#FFD700">✨</text>
    <text x="350" y="50" font-family="monospace" font-size="14" fill="#FFD700">⭐</text>
    <text x="360" y="150" font-family="monospace" font-size="14" fill="#FFD700">💫</text>
  `
}

function generateCrown(): string {
  return `
    <text x="180" y="40" font-family="monospace" font-size="16" fill="#FFD700">👑</text>
  `
}

function generateErrorSVG(): string {
  return `
    <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill="#fee2e2"/>
      <text x="200" y="100" font-family="monospace" font-size="20" fill="#dc2626" text-anchor="middle">😿 Cat not found</text>
      <text x="200" y="130" font-family="monospace" font-size="14" fill="#dc2626" text-anchor="middle">Please try again later</text>
    </svg>
  `
}
