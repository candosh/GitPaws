"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const catStages = [
  { id: 0, name: "잠자는 고양이", commits: "0개", description: "커밋 활동이 없어요" },
  { id: 1, name: "아기 고양이", commits: "1-25개", description: "개발을 시작했어요!" },
  { id: 2, name: "호기심 고양이", commits: "26-75개", description: "코딩이 재미있어요" },
  { id: 3, name: "활발한 고양이", commits: "76-150개", description: "열심히 개발 중이에요" },
  { id: 4, name: "성묘", commits: "151-300개", description: "안정적인 개발자예요" },
  { id: 5, name: "개발자 고양이", commits: "301-500개", description: "진짜 개발자가 되었어요" },
  { id: 6, name: "마스터 고양이", commits: "501개+", description: "커밋의 대가입니다!" },
]

// 모든 고양이 컴포넌트를 더 귀엽게 다시 디자인합니다.

// Sleeping Cat (Stage 0) - 더 귀여운 잠자는 고양이
function SleepingCat() {
  return (
    <div className="relative w-32 h-32 mx-auto">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* 더 부드러운 이불 */}
        <div className="w-28 h-22 bg-gradient-to-br from-pink-200 to-pink-300 rounded-2xl relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-100 to-pink-400 opacity-70"></div>
          {/* 귀여운 패턴 */}
          <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-60"></div>
          <div className="absolute top-4 right-3 w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="absolute bottom-3 left-4 w-2 h-2 bg-white rounded-full opacity-60"></div>

          {/* 이불 속 고양이 얼굴 */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-6 bg-gradient-to-b from-orange-300 to-orange-400 rounded-full relative">
              {/* 잠든 눈 */}
              <div className="absolute top-2 left-1 w-2 h-1 bg-black rounded-full"></div>
              <div className="absolute top-2 right-1 w-2 h-1 bg-black rounded-full"></div>
              {/* 작은 코 */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full"></div>
            </div>
          </div>
        </div>
        {/* 더 귀여운 ZZZ */}
        <div className="absolute -top-4 -right-1 animate-bounce">
          <div className="text-2xl animate-pulse">😴</div>
        </div>
      </div>
    </div>
  )
}

// Baby Kitten (Stage 1) - 초귀여운 아기 고양이
function BabyKitten() {
  return (
    <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
      <div className="relative">
        {/* 몸통 - 더 둥글고 귀엽게 */}
        <div className="w-16 h-14 bg-gradient-to-b from-orange-300 to-orange-400 rounded-full relative shadow-lg">
          {/* 머리 - 더 크고 귀엽게 */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <div className="w-14 h-12 bg-gradient-to-b from-orange-300 to-orange-400 rounded-full relative shadow-md">
              {/* 귀 - 더 둥글고 안쪽 분홍색 */}
              <div className="absolute -top-4 left-2 w-4 h-5 bg-orange-400 rounded-full transform rotate-12 shadow-sm">
                <div className="absolute inset-1 w-2 h-3 bg-pink-300 rounded-full"></div>
              </div>
              <div className="absolute -top-4 right-2 w-4 h-5 bg-orange-400 rounded-full transform -rotate-12 shadow-sm">
                <div className="absolute inset-1 w-2 h-3 bg-pink-300 rounded-full"></div>
              </div>

              {/* 큰 반짝이는 눈 */}
              <div className="absolute top-3 left-2 w-4 h-4 bg-black rounded-full">
                <div className="absolute top-0.5 left-0.5 w-3 h-3 bg-blue-600 rounded-full">
                  <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute bottom-0.5 left-1 w-0.5 h-0.5 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="absolute top-3 right-2 w-4 h-4 bg-black rounded-full">
                <div className="absolute top-0.5 left-0.5 w-3 h-3 bg-blue-600 rounded-full">
                  <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute bottom-0.5 right-1 w-0.5 h-0.5 bg-white rounded-full"></div>
                </div>
              </div>

              {/* 하트 모양 코 */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-500 rounded-full relative">
                <div className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-pink-500 rounded-full"></div>
                <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-pink-500 rounded-full"></div>
              </div>

              {/* 작은 입 */}
              <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-3 h-1 border-b-2 border-pink-600 rounded-full"></div>
            </div>
          </div>

          {/* 귀여운 꼬리 */}
          <div className="absolute -right-4 top-3 w-12 h-4 bg-gradient-to-r from-orange-400 to-orange-300 rounded-full transform rotate-12 animate-pulse shadow-sm"></div>

          {/* 작은 발 */}
          <div className="absolute -bottom-1 left-3 w-3 h-4 bg-orange-300 rounded-full shadow-sm"></div>
          <div className="absolute -bottom-1 right-3 w-3 h-4 bg-orange-300 rounded-full shadow-sm"></div>
        </div>

        {/* 하트 이펙트 */}
        <div className="absolute -top-2 -right-2 text-pink-400 animate-bounce">💕</div>
      </div>
    </div>
  )
}

// Curious Kitten (Stage 2) - 호기심 가득한 귀여운 고양이
function CuriousKitten() {
  return (
    <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
      {/* 무지개 공 */}
      <div className="absolute bottom-6 right-6 w-6 h-6 bg-gradient-to-br from-red-400 via-yellow-400 to-blue-400 rounded-full animate-bounce shadow-lg">
        <div className="absolute inset-1 bg-white rounded-full opacity-30"></div>
      </div>

      <div className="relative">
        {/* 몸통 */}
        <div className="w-18 h-16 bg-gradient-to-b from-orange-300 to-orange-400 rounded-full relative shadow-lg">
          {/* 머리 */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div className="w-16 h-14 bg-gradient-to-b from-orange-300 to-orange-400 rounded-full relative shadow-md">
              {/* 귀 */}
              <div className="absolute -top-5 left-2 w-5 h-6 bg-orange-400 rounded-full transform rotate-12 shadow-sm">
                <div className="absolute inset-1 w-3 h-4 bg-pink-300 rounded-full"></div>
              </div>
              <div className="absolute -top-5 right-2 w-5 h-6 bg-orange-400 rounded-full transform -rotate-12 shadow-sm">
                <div className="absolute inset-1 w-3 h-4 bg-pink-300 rounded-full"></div>
              </div>

              {/* 반짝이는 큰 눈 */}
              <div className="absolute top-4 left-2 w-5 h-5 bg-black rounded-full">
                <div className="absolute inset-0.5 w-4 h-4 bg-green-500 rounded-full">
                  <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1 left-1.5 w-0.5 h-0.5 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="absolute top-4 right-2 w-5 h-5 bg-black rounded-full">
                <div className="absolute inset-0.5 w-4 h-4 bg-green-500 rounded-full">
                  <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1 right-1.5 w-0.5 h-0.5 bg-white rounded-full"></div>
                </div>
              </div>

              {/* 하트 코 */}
              <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-500 rounded-full relative">
                <div className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-pink-500 rounded-full"></div>
                <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-pink-500 rounded-full"></div>
              </div>

              {/* 웃는 입 */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-pink-600 rounded-full"></div>
            </div>
          </div>

          {/* 신나게 흔드는 꼬리 */}
          <div className="absolute -right-5 top-4 w-14 h-4 bg-gradient-to-r from-orange-400 to-orange-300 rounded-full transform origin-left animate-wag shadow-sm"></div>

          {/* 발 */}
          <div className="absolute -bottom-2 left-3 w-4 h-5 bg-orange-300 rounded-full shadow-sm"></div>
          <div className="absolute -bottom-2 right-3 w-4 h-5 bg-orange-300 rounded-full shadow-sm"></div>
        </div>

        {/* 별 이펙트 */}
        <div className="absolute -top-1 -left-2 text-yellow-400 animate-bounce delay-100">⭐</div>
      </div>
    </div>
  )
}

// Active Cat (Stage 3) - 활발한 귀여운 고양이
function ActiveCat() {
  return (
    <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
      <div className="relative animate-bounce">
        {/* 몸통 */}
        <div className="w-20 h-18 bg-gradient-to-b from-orange-300 to-orange-400 rounded-full relative shadow-lg">
          {/* 머리 */}
          <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
            <div className="w-18 h-16 bg-gradient-to-b from-orange-300 to-orange-400 rounded-full relative shadow-md">
              {/* 귀 */}
              <div className="absolute -top-6 left-2 w-6 h-7 bg-orange-400 rounded-full transform rotate-12 shadow-sm">
                <div className="absolute inset-1 w-4 h-5 bg-pink-300 rounded-full"></div>
              </div>
              <div className="absolute -top-6 right-2 w-6 h-7 bg-orange-400 rounded-full transform -rotate-12 shadow-sm">
                <div className="absolute inset-1 w-4 h-5 bg-pink-300 rounded-full"></div>
              </div>

              {/* 신나는 눈 */}
              <div className="absolute top-5 left-3 w-5 h-5 bg-black rounded-full">
                <div className="absolute inset-0.5 w-4 h-4 bg-amber-500 rounded-full">
                  <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1 left-1.5 w-0.5 h-0.5 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="absolute top-5 right-3 w-5 h-5 bg-black rounded-full">
                <div className="absolute inset-0.5 w-4 h-4 bg-amber-500 rounded-full">
                  <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1 right-1.5 w-0.5 h-0.5 bg-white rounded-full"></div>
                </div>
              </div>

              {/* 하트 코 */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-500 rounded-full relative">
                <div className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-pink-500 rounded-full"></div>
                <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-pink-500 rounded-full"></div>
              </div>

              {/* 활짝 웃는 입 */}
              <div className="absolute top-9 left-1/2 transform -translate-x-1/2 w-5 h-2 border-b-3 border-pink-600 rounded-full"></div>
            </div>
          </div>

          {/* 점프하는 자세의 꼬리 */}
          <div className="absolute -right-6 top-5 w-16 h-4 bg-gradient-to-r from-orange-400 to-orange-300 rounded-full transform rotate-12 animate-wag shadow-sm"></div>

          {/* 점프하는 발 */}
          <div className="absolute -bottom-1 left-2 w-4 h-7 bg-orange-300 rounded-full transform -rotate-12 shadow-sm"></div>
          <div className="absolute -bottom-1 right-2 w-4 h-7 bg-orange-300 rounded-full transform rotate-12 shadow-sm"></div>
        </div>

        {/* 움직임 이펙트 */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-blue-400 animate-bounce">💨</div>
      </div>
    </div>
  )
}

// Adult Cat (Stage 4) - 우아한 성묘
function AdultCat() {
  return (
    <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
      <div className="relative">
        {/* 몸통 */}
        <div className="w-22 h-20 bg-gradient-to-b from-orange-400 to-orange-500 rounded-full relative shadow-lg">
          {/* 머리 */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <div className="w-20 h-18 bg-gradient-to-b from-orange-400 to-orange-500 rounded-full relative shadow-md">
              {/* 귀 */}
              <div className="absolute -top-7 left-3 w-7 h-8 bg-orange-500 rounded-full transform rotate-12 shadow-sm">
                <div className="absolute inset-1 w-5 h-6 bg-pink-300 rounded-full"></div>
              </div>
              <div className="absolute -top-7 right-3 w-7 h-8 bg-orange-500 rounded-full transform -rotate-12 shadow-sm">
                <div className="absolute inset-1 w-5 h-6 bg-pink-300 rounded-full"></div>
              </div>

              {/* 지혜로운 눈 */}
              <div className="absolute top-6 left-4 w-6 h-6 bg-black rounded-full">
                <div className="absolute inset-0.5 w-5 h-5 bg-emerald-600 rounded-full">
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1 left-2 w-0.5 h-0.5 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="absolute top-6 right-4 w-6 h-6 bg-black rounded-full">
                <div className="absolute inset-0.5 w-5 h-5 bg-emerald-600 rounded-full">
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1 right-2 w-0.5 h-0.5 bg-white rounded-full"></div>
                </div>
              </div>

              {/* 하트 코 */}
              <div className="absolute top-9 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-500 rounded-full relative">
                <div className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-pink-500 rounded-full"></div>
                <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-pink-500 rounded-full"></div>
              </div>

              {/* 만족스러운 입 */}
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-4 h-1 border-b-2 border-pink-600 rounded-full"></div>

              {/* 수염 */}
              <div className="absolute top-9 left-1 w-5 h-0.5 bg-gray-700 rounded-full"></div>
              <div className="absolute top-10 left-0 w-6 h-0.5 bg-gray-700 rounded-full"></div>
              <div className="absolute top-9 right-1 w-5 h-0.5 bg-gray-700 rounded-full"></div>
              <div className="absolute top-10 right-0 w-6 h-0.5 bg-gray-700 rounded-full"></div>
            </div>
          </div>

          {/* 우아한 꼬리 */}
          <div className="absolute -right-7 top-8 w-18 h-5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transform rotate-45 animate-pulse shadow-sm"></div>

          {/* 앉은 자세의 발 */}
          <div className="absolute -bottom-2 left-4 w-5 h-8 bg-orange-400 rounded-full shadow-sm"></div>
          <div className="absolute -bottom-2 right-4 w-5 h-8 bg-orange-400 rounded-full shadow-sm"></div>
        </div>

        {/* 평온함 이펙트 */}
        <div className="absolute -top-3 right-2 text-green-400 animate-pulse">🌿</div>
      </div>
    </div>
  )
}

// Developer Cat (Stage 5) - 개발자 고양이
function DeveloperCat() {
  return (
    <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
      {/* 귀여운 노트북 */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-10 bg-gradient-to-b from-gray-300 to-gray-400 rounded-lg shadow-lg">
        <div className="w-full h-6 bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-lg relative">
          <div className="absolute inset-1 bg-gradient-to-br from-green-400 to-blue-500 rounded-sm animate-pulse">
            <div className="absolute top-1 left-1 text-xs text-white font-mono">{"<code/>"}</div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-500 rounded-full"></div>
      </div>

      <div className="relative">
        {/* 몸통 */}
        <div className="w-20 h-18 bg-gradient-to-b from-gray-500 to-gray-600 rounded-full relative shadow-lg">
          {/* 머리 */}
          <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
            <div className="w-18 h-16 bg-gradient-to-b from-gray-500 to-gray-600 rounded-full relative shadow-md">
              {/* 귀 */}
              <div className="absolute -top-6 left-2 w-6 h-7 bg-gray-600 rounded-full transform rotate-12 shadow-sm">
                <div className="absolute inset-1 w-4 h-5 bg-pink-300 rounded-full"></div>
              </div>
              <div className="absolute -top-6 right-2 w-6 h-7 bg-gray-600 rounded-full transform -rotate-12 shadow-sm">
                <div className="absolute inset-1 w-4 h-5 bg-pink-300 rounded-full"></div>
              </div>

              {/* 귀여운 안경 */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-14 h-8 border-3 border-black rounded-full bg-white bg-opacity-20 shadow-md">
                <div className="absolute top-1 left-2 w-4 h-4 border-2 border-black rounded-full bg-white bg-opacity-50"></div>
                <div className="absolute top-1 right-2 w-4 h-4 border-2 border-black rounded-full bg-white bg-opacity-50"></div>
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-black rounded-full"></div>
              </div>

              {/* 안경 뒤의 집중하는 눈 */}
              <div className="absolute top-5 left-4 w-3 h-3 bg-blue-600 rounded-full">
                <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full animate-pulse"></div>
              </div>
              <div className="absolute top-5 right-4 w-3 h-3 bg-blue-600 rounded-full">
                <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full animate-pulse"></div>
              </div>

              {/* 하트 코 */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-500 rounded-full relative">
                <div className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-pink-500 rounded-full"></div>
                <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-pink-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* 꼬리 */}
          <div className="absolute -right-6 top-6 w-16 h-4 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full transform rotate-45 shadow-sm"></div>
        </div>

        {/* 코딩 이펙트 */}
        <div className="absolute -top-2 -left-3 text-blue-400 animate-bounce">💻</div>
        <div className="absolute -top-1 right-1 text-green-400 animate-pulse">⚡</div>
      </div>
    </div>
  )
}

// Master Cat (Stage 6) - 마스터 고양이
function MasterCat() {
  return (
    <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
      {/* 마법같은 오라 */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 rounded-full animate-ping opacity-30"></div>
      <div className="absolute inset-1 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 rounded-full animate-pulse opacity-40"></div>

      <div className="relative">
        {/* 몸통 - 더 크고 위엄있게 */}
        <div className="w-24 h-22 bg-gradient-to-b from-yellow-300 via-orange-400 to-orange-500 rounded-full relative shadow-2xl">
          {/* 머리 */}
          <div className="absolute -top-18 left-1/2 transform -translate-x-1/2">
            <div className="w-22 h-20 bg-gradient-to-b from-yellow-300 via-orange-400 to-orange-500 rounded-full relative shadow-xl">
              {/* 화려한 왕관 */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="w-16 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 relative rounded-t-lg shadow-lg">
                  <div className="absolute top-0 left-2 w-3 h-6 bg-gradient-to-t from-yellow-600 to-yellow-400 transform rotate-12 rounded-t-full"></div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-8 bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-t-full"></div>
                  <div className="absolute top-0 right-2 w-3 h-6 bg-gradient-to-t from-yellow-600 to-yellow-400 transform -rotate-12 rounded-t-full"></div>
                  {/* 보석들 */}
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-red-400 to-red-600 rounded-full animate-pulse shadow-lg"></div>
                  <div className="absolute top-2 left-3 w-2 h-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full animate-pulse delay-100"></div>
                  <div className="absolute top-2 right-3 w-2 h-2 bg-gradient-to-br from-green-400 to-green-600 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>

              {/* 귀 */}
              <div className="absolute -top-7 left-3 w-8 h-9 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full transform rotate-12 shadow-lg">
                <div className="absolute inset-1 w-6 h-7 bg-pink-300 rounded-full"></div>
              </div>
              <div className="absolute -top-7 right-3 w-8 h-9 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full transform -rotate-12 shadow-lg">
                <div className="absolute inset-1 w-6 h-7 bg-pink-300 rounded-full"></div>
              </div>

              {/* 신비로운 빛나는 눈 */}
              <div className="absolute top-6 left-5 w-7 h-7 bg-black rounded-full shadow-lg">
                <div className="absolute inset-0.5 w-6 h-6 bg-gradient-to-br from-cyan-300 to-cyan-600 rounded-full animate-pulse shadow-lg shadow-cyan-400">
                  <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1 left-2 w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="absolute top-6 right-5 w-7 h-7 bg-black rounded-full shadow-lg">
                <div className="absolute inset-0.5 w-6 h-6 bg-gradient-to-br from-cyan-300 to-cyan-600 rounded-full animate-pulse shadow-lg shadow-cyan-400">
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1 right-2 w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>

              {/* 하트 코 */}
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-pink-500 rounded-full relative shadow-md">
                <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
              </div>

              {/* 황금 수염 */}
              <div className="absolute top-10 left-0 w-7 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-sm"></div>
              <div className="absolute top-11 left-0 w-8 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-sm"></div>
              <div className="absolute top-10 right-0 w-7 h-1 bg-gradient-to-l from-yellow-400 to-yellow-600 rounded-full shadow-sm"></div>
              <div className="absolute top-11 right-0 w-8 h-1 bg-gradient-to-l from-yellow-400 to-yellow-600 rounded-full shadow-sm"></div>
            </div>
          </div>

          {/* 위엄있는 꼬리 */}
          <div className="absolute -right-8 top-10 w-20 h-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 rounded-full transform rotate-45 animate-pulse shadow-lg"></div>

          {/* 앉은 자세 */}
          <div className="absolute -bottom-2 left-5 w-6 h-10 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full shadow-lg"></div>
          <div className="absolute -bottom-2 right-5 w-6 h-10 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full shadow-lg"></div>
        </div>
      </div>

      {/* 마법 이펙트들 */}
      <div className="absolute top-1 left-1 text-2xl animate-bounce">✨</div>
      <div className="absolute top-3 right-1 text-2xl animate-bounce">⭐</div>
      <div className="absolute bottom-1 left-2 text-2xl animate-bounce delay-200">💫</div>
      <div className="absolute bottom-3 right-3 text-2xl animate-bounce delay-300">🌟</div>
      <div className="absolute top-8 left-8 text-xl animate-bounce delay-150">💎</div>
      <div className="absolute top-8 right-8 text-xl animate-bounce delay-250">👑</div>
    </div>
  )
}

export default function CatSprites() {
  const [selectedStage, setSelectedStage] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setSelectedStage((prev) => (prev + 1) % 7)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [autoPlay])

  const renderCat = (stage: number) => {
    switch (stage) {
      case 0:
        return <SleepingCat />
      case 1:
        return <BabyKitten />
      case 2:
        return <CuriousKitten />
      case 3:
        return <ActiveCat />
      case 4:
        return <AdultCat />
      case 5:
        return <DeveloperCat />
      case 6:
        return <MasterCat />
      default:
        return <SleepingCat />
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">🐱 GitHub 커밋 고양이 성장 단계</CardTitle>
          <CardDescription>커밋 수에 따라 성장하는 픽셀 아트 고양이들을 확인해보세요!</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Main Display */}
          <div className="text-center mb-8">
            <div className="bg-gray-100 rounded-lg p-8 mb-4 min-h-[200px] flex items-center justify-center">
              {renderCat(selectedStage)}
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{catStages[selectedStage].name}</h3>
              <Badge variant="secondary" className="text-sm">
                연간 커밋: {catStages[selectedStage].commits}
              </Badge>
              <p className="text-gray-600">{catStages[selectedStage].description}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-2 mb-6">
            <Button onClick={() => setAutoPlay(!autoPlay)} variant={autoPlay ? "default" : "outline"}>
              {autoPlay ? "자동 재생 중지" : "자동 재생"}
            </Button>
          </div>

          {/* Stage Selector */}
          <div className="grid grid-cols-7 gap-2">
            {catStages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => {
                  setSelectedStage(stage.id)
                  setAutoPlay(false)
                }}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedStage === stage.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="h-16 flex items-center justify-center mb-2">
                  <div className="scale-50 transform-gpu">{renderCat(stage.id)}</div>
                </div>
                <div className="text-xs font-medium">{stage.name}</div>
                <div className="text-xs text-gray-500">{stage.commits}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Guide */}
      <Card>
        <CardHeader>
          <CardTitle>🛠 README에 삽입하기</CardTitle>
          <CardDescription>아래 마크다운 코드를 복사해서 README 파일에 붙여넣으세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
            <code>![Commit Cat](https://commit-cat.vercel.app/api/cat/your-username)</code>
          </div>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>
              • <code>your-username</code>을 실제 GitHub 사용자명으로 변경하세요
            </p>
            <p>• 이미지는 매일 자동으로 업데이트됩니다</p>
            <p>• 최근 1년간의 커밋 활동을 기준으로 고양이가 성장합니다</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
