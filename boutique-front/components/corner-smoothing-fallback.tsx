"use client"

import type React from "react"

interface CornerSmoothingProps {
  children: React.ReactNode
  radius?: number
  padding?: number
  className?: string
  style?: React.CSSProperties
}

export function CornerSmoothing({
  children,
  radius = 16,
  padding = 0,
  className = "",
  style = {},
}: CornerSmoothingProps) {
  // Create a style object that includes the border-radius
  const combinedStyle = {
    ...style,
    borderRadius: `${radius}px`,
    padding: padding ? `${padding}px` : undefined,
  }

  return (
    <div className={className} style={combinedStyle}>
      {children}
    </div>
  )
}
