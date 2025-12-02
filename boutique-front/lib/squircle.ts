// Function to create a squircle path
export function createSquirclePath(width: number, height: number, radius: number): string {
  const smoothing = 0.65 // Smoothing factor for the squircle shape

  // Calculate control points
  const c = radius * smoothing

  // Start at top-left corner
  return `
    M ${radius},0
    L ${width - radius},0
    C ${width - radius + c},0 ${width},${radius - c} ${width},${radius}
    L ${width},${height - radius}
    C ${width},${height - radius + c} ${width - radius + c},${height} ${width - radius},${height}
    L ${radius},${height}
    C ${radius - c},${height} 0,${height - radius + c} 0,${height - radius}
    L 0,${radius}
    C 0,${radius - c} ${radius - c},0 ${radius},0
    Z
  `
    .replace(/\s+/g, " ")
    .trim()
}

// CSS for squircle shape using clip-path
export function squircleClipPath(radius = 16): string {
  return `
    clip-path: path('${createSquirclePath(100, 100, radius)}');
  `
}
