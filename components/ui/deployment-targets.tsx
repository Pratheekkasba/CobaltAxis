/*
 * Isometric blue dot-matrix deployment cards ("In your data center",
 * "In your VPC", "On your laptop") framed with 90-degree corner brackets.
 * Dots are generated deterministically on a fixed grid so SSR and client
 * renders stay identical with zero external image assets.
 */

type Dot = {
  x: number
  y: number
  fill: string
}

const GRID_STEP = 4.3
const DOT_SIZE = 2.6
const VIEW_SIZE = 220

// Cobalt Axis blue dot-matrix palette aligned with --primary (#5669FF / #3B5BDB)
const C_DEEP = "#2563EB"
const C_MID = "#3B5BDB"
const C_BRIGHT = "#5669FF"
const C_LIGHT = "#60A5FA"
const C_PALE = "#93C5FD"
const C_FAINT = "#BFDBFE"

/** Point-in-triangle / convex quad helper via cross-product signs. */
function pointInQuad(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
  cx: number,
  cy: number,
  dx: number,
  dy: number
) {
  const cross = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x: number,
    y: number
  ) => (x2 - x1) * (y - y1) - (y2 - y1) * (x - x1)

  const c1 = cross(ax, ay, bx, by, px, py)
  const c2 = cross(bx, by, cx, cy, px, py)
  const c3 = cross(cx, cy, dx, dy, px, py)
  const c4 = cross(dx, dy, ax, ay, px, py)

  return (
    (c1 >= 0 && c2 >= 0 && c3 >= 0 && c4 >= 0) ||
    (c1 <= 0 && c2 <= 0 && c3 <= 0 && c4 <= 0)
  )
}

function buildDataCenterDots(): Dot[] {
  const dots: Dot[] = []
  const cx = 110

  // Isometric server prism parameters
  const halfW = 48
  const isoH = 23
  const topY = 26
  const bodyH = 104

  for (let y = 16; y <= 206; y += GRID_STEP) {
    for (let x = 24; x <= 196; x += GRID_STEP) {
      const dx = Math.abs(x - cx)
      if (dx > 66) continue

      // Top diamond face: center at (cx, topY + isoH)
      const topCenterY = topY + isoH
      const inTop = Math.abs(x - cx) / halfW + Math.abs(y - topCenterY) / isoH <= 1

      // Front chevron y-bounds at horizontal distance dx from center spine
      const topFrontEdgeY = topCenterY + isoH * (1 - dx / halfW)
      const botFrontEdgeY = topFrontEdgeY + bodyH
      const inFront = dx <= halfW && y >= topFrontEdgeY && y <= botFrontEdgeY

      // Subtle flared ground base shadow under tower
      const shadowCenterY = topCenterY + bodyH + isoH * 0.72
      const inShadow =
        !inFront &&
        !inTop &&
        Math.abs(x - cx) / (halfW * 1.18) +
          Math.abs(y - shadowCenterY) / (isoH * 1.18) <=
          1 &&
        y > topCenterY + bodyH * 0.65

      if (inTop) {
        // Crisp light top cap with slightly stronger perimeter
        const edgeDist = Math.abs(x - cx) / halfW + Math.abs(y - topCenterY) / isoH
        dots.push({
          x,
          y,
          fill: edgeDist > 0.86 ? C_LIGHT : C_PALE,
        })
      } else if (inFront) {
        const relY = y - topFrontEdgeY
        const isRightFace = x >= cx
        // 4 angled dark server blade bays
        const bladeSlot =
          (relY >= 14 && relY <= 26) ||
          (relY >= 34 && relY <= 46) ||
          (relY >= 54 && relY <= 66) ||
          (relY >= 74 && relY <= 86)

        // Small status port near bottom-right of chassis
        const isStatusPort = isRightFace && dx >= 30 && dx <= 38 && relY >= 91 && relY <= 97

        // Crisp V-spine & outer edges
        const isEdge = dx < 2.2 || dx > halfW - 3 || relY > bodyH - 3.5

        let fill = isRightFace ? C_LIGHT : C_PALE
        if (isStatusPort) {
          fill = C_DEEP
        } else if (bladeSlot && dx > 3 && dx < halfW - 4) {
          fill = isRightFace ? C_DEEP : C_MID
        } else if (isEdge) {
          fill = C_BRIGHT
        }

        dots.push({ x, y, fill })
      } else if (inShadow) {
        dots.push({ x, y, fill: C_FAINT })
      }
    }
  }

  return dots
}

function buildVpcCloudDots(): Dot[] {
  const dots: Dot[] = []

  const lobes = [
    { cx: 108, cy: 84, r: 34 },
    { cx: 78, cy: 105, r: 26 },
    { cx: 60, cy: 129, r: 22 },
    { cx: 142, cy: 106, r: 26 },
    { cx: 168, cy: 124, r: 22 },
    { cx: 108, cy: 124, r: 32 },
  ]

  // Underside shadow ridges inside the cloud
  const shadowZones = [
    { cx: 76, cy: 118, rx: 24, ry: 7 },
    { cx: 148, cy: 121, rx: 32, ry: 10 },
    { cx: 92, cy: 144, rx: 22, ry: 5 },
  ]

  for (let y = 36; y <= 186; y += GRID_STEP) {
    for (let x = 26; x <= 198; x += GRID_STEP) {
      const inMainLobes = lobes.some(
        (l) => (x - l.cx) * (x - l.cx) + (y - l.cy) * (y - l.cy) <= l.r * l.r
      )
      const inFlatBelly = x >= 58 && x <= 168 && y >= 114 && y <= 151
      const inMainCloud = (inMainLobes || inFlatBelly) && y <= 152

      // Detached lower-right cloud wisp
      const inWisp =
        ((x - 144) / 26) ** 2 + ((y - 166) / 11) ** 2 <= 1 && y >= 158

      if (!inMainCloud && !inWisp) continue

      let fill = C_PALE
      if (inMainCloud) {
        const inDeepShadow = shadowZones.some(
          (s) => ((x - s.cx) / s.rx) ** 2 + ((y - s.cy) / s.ry) ** 2 <= 1
        )
        const inMidRim =
          shadowZones.some(
            (s) => ((x - s.cx) / (s.rx + 5)) ** 2 + ((y - s.cy) / (s.ry + 4)) ** 2 <= 1
          ) || y >= 146

        if (inDeepShadow) {
          fill = C_DEEP
        } else if (inMidRim) {
          fill = C_LIGHT
        }
      } else if (inWisp) {
        fill = y >= 170 ? C_LIGHT : C_PALE
      }

      dots.push({ x, y, fill })
    }
  }

  return dots
}

function buildLaptopDots(): Dot[] {
  const dots: Dot[] = []

  // Screen outer quad (tilted isometric plane)
  const sTL = [38, 86] as const
  const sTR = [138, 34] as const
  const sBR = [138, 114] as const
  const sBL = [38, 166] as const

  // Screen inner cutout (clean white screen)
  const iTL = [45, 90] as const
  const iTR = [131, 45] as const
  const iBR = [131, 108] as const
  const iBL = [45, 153] as const

  // Base deck quad
  const bBL = [38, 166] as const
  const bBR = [138, 114] as const
  const bFR = [194, 158] as const
  const bFL = [94, 210] as const

  // Keyboard recessed area inside base
  const kBL = [55, 164] as const
  const kBR = [132, 124] as const
  const kFR = [164, 149] as const
  const kFL = [87, 189] as const

  // Trackpad cutout near front edge
  const tBL = [108, 184] as const
  const tBR = [136, 169] as const
  const tFR = [150, 180] as const
  const tFL = [122, 195] as const

  for (let y = 26; y <= 214; y += GRID_STEP) {
    for (let x = 30; x <= 202; x += GRID_STEP) {
      const inScreenOuter = pointInQuad(
        x,
        y,
        sTL[0],
        sTL[1],
        sTR[0],
        sTR[1],
        sBR[0],
        sBR[1],
        sBL[0],
        sBL[1]
      )
      const inScreenInner = pointInQuad(
        x,
        y,
        iTL[0],
        iTL[1],
        iTR[0],
        iTR[1],
        iBR[0],
        iBR[1],
        iBL[0],
        iBL[1]
      )

      if (inScreenOuter && !inScreenInner) {
        dots.push({ x, y, fill: C_DEEP })
        continue
      }

      const inBase = pointInQuad(
        x,
        y,
        bBL[0],
        bBL[1],
        bBR[0],
        bBR[1],
        bFR[0],
        bFR[1],
        bFL[0],
        bFL[1]
      )
      if (!inBase) continue

      const inKeyboard = pointInQuad(
        x,
        y,
        kBL[0],
        kBL[1],
        kBR[0],
        kBR[1],
        kFR[0],
        kFR[1],
        kFL[0],
        kFL[1]
      )
      const inTrackpad = pointInQuad(
        x,
        y,
        tBL[0],
        tBL[1],
        tBR[0],
        tBR[1],
        tFR[0],
        tFR[1],
        tFL[0],
        tFL[1]
      )

      if (inTrackpad) {
        dots.push({ x, y, fill: C_FAINT })
      } else if (inKeyboard) {
        // Subtle keycap stipple
        const gx = Math.round(x / GRID_STEP)
        const gy = Math.round(y / GRID_STEP)
        dots.push({ x, y, fill: (gx + gy) % 2 === 0 ? C_DEEP : C_BRIGHT })
      } else {
        dots.push({ x, y, fill: C_LIGHT })
      }
    }
  }

  return dots
}

const DATA_CENTER_DOTS = buildDataCenterDots()
const VPC_CLOUD_DOTS = buildVpcCloudDots()
const LAPTOP_DOTS = buildLaptopDots()

const DEPLOYMENT_TARGETS = [
  { id: "01", title: "Private Cloud & VPC", dots: DATA_CENTER_DOTS },
  { id: "02", title: "Cloud & Edge Mesh", dots: VPC_CLOUD_DOTS },
  { id: "03", title: "Team Apps & Consoles", dots: LAPTOP_DOTS },
] as const

export function DeploymentTargets() {
  return (
    <div className="mt-14 grid grid-cols-1 gap-4 sm:mt-16 md:grid-cols-3 md:gap-5">
      {DEPLOYMENT_TARGETS.map((target) => (
        <div
          key={target.id}
          className="group flex flex-col justify-between rounded-xl border border-border bg-secondary/40 p-4 transition-colors duration-200 hover:border-primary/40 hover:bg-secondary/60 dark:bg-card/40 sm:p-5"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-base leading-snug font-medium tracking-[-0.015em] text-foreground font-[family-name:var(--font-display)] sm:text-[17px]">
              {target.title}
            </h3>
            <span className="shrink-0 font-mono text-[11px] tracking-[0.18em] text-primary/80">
              {target.id}
            </span>
          </div>

          {/* Compact corner-bracketed halftone artwork frame */}
          <div className="relative mt-3 flex h-28 w-full items-center justify-center p-2 sm:h-32">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 size-2 border-l border-t border-border transition-colors duration-200 group-hover:border-primary/50"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 size-2 border-r border-t border-border transition-colors duration-200 group-hover:border-primary/50"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 size-2 border-b border-l border-border transition-colors duration-200 group-hover:border-primary/50"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 right-0 size-2 border-b border-r border-border transition-colors duration-200 group-hover:border-primary/50"
            />

            <svg
              viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
              className="h-full w-auto max-h-[108px]"
              aria-hidden="true"
            >
              {target.dots.map((dot, idx) => (
                <rect
                  key={idx}
                  x={dot.x - DOT_SIZE / 2}
                  y={dot.y - DOT_SIZE / 2}
                  width={DOT_SIZE}
                  height={DOT_SIZE}
                  rx={0.45}
                  fill={dot.fill}
                />
              ))}
            </svg>
          </div>
        </div>
      ))}
    </div>
  )
}
