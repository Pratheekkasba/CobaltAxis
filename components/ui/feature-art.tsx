/*
 * FeatureArt — three compact isometric dioramas for the home-page feature
 * cards, drawn in the exact visual language of the hero city: 2:1 isometric
 * projection, navy outlines, cobalt signage, mint greenery, white platforms.
 * Pure SVG: crisp at any size, theme-safe, no image downloads.
 *
 * Same grid logic as hero-city.tsx, scaled down for card-size scenes.
 */

const U = 20
const V = 10
const OX = 180
const OY = 88
const GRID = 8

const NAVY = "#161d3a"
const FACE_RIGHT = "#f3f4f9" // SE-facing walls
const FACE_LEFT = "#e9ecff" // SW-facing walls
const GLASS = "#dfe6ff"
const ROAD = "#c3cae6"
const COBALT = "#5669ff"
const MINT = "#0fb98b"
const MINT_DARK = "#04b488"

type G3 = [number, number, number]

const iso = (gx: number, gy: number, z = 0): [number, number] => [
  OX + (gx - gy) * U,
  OY + (gx + gy) * V - z,
]

const poly = (corners: G3[]) =>
  corners
    .map(([gx, gy, z]) => {
      const [x, y] = iso(gx, gy, z)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")

const lerp = (a: [number, number], b: [number, number], t: number): [number, number] => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
]

// Rounded diamond platform through the four grid corners.
const roundedDiamond = (inset: number, round: number) => {
  const corners: G3[] = [
    [inset, inset, 0],
    [GRID - inset, inset, 0],
    [GRID - inset, GRID - inset, 0],
    [inset, GRID - inset, 0],
  ]
  const P = corners.map(([gx, gy]) => iso(gx, gy))
  let d = ""
  for (let i = 0; i < 4; i++) {
    const prev = P[(i + 3) % 4]
    const cur = P[i]
    const next = P[(i + 1) % 4]
    const inPt = lerp(cur, prev, round)
    const outPt = lerp(cur, next, round)
    d += `${i === 0 ? "M" : "L"} ${inPt[0].toFixed(1)} ${inPt[1].toFixed(1)} `
    d += `Q ${cur[0].toFixed(1)} ${cur[1].toFixed(1)} ${outPt[0].toFixed(1)} ${outPt[1].toFixed(1)} `
  }
  return `${d}Z`
}

// An iso box: three visible faces (top, SE wall, SW wall).
const Box = ({
  x,
  y,
  w,
  d,
  h,
  z = 0,
  top = "#ffffff",
  right = FACE_RIGHT,
  left = FACE_LEFT,
}: {
  x: number
  y: number
  w: number
  d: number
  h: number
  z?: number
  top?: string
  right?: string
  left?: string
}) => (
  <g stroke={NAVY} strokeWidth={2} strokeLinejoin="round">
    <polygon points={poly([[x + w, y, z + h], [x + w, y + d, z + h], [x + w, y + d, z], [x + w, y, z]])} fill={right} />
    <polygon points={poly([[x, y + d, z + h], [x + w, y + d, z + h], [x + w, y + d, z], [x, y + d, z]])} fill={left} />
    <polygon points={poly([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={top} />
  </g>
)

// Quad on a wall plane: plane "se" = const gx (faces lower-right),
// "sw" = const gy (faces lower-left). u walks the in-plane grid axis.
const wallQuad = ({
  plane,
  at,
  u0,
  u1,
  z0,
  z1,
  fill,
  line = true,
}: {
  plane: "se" | "sw"
  at: number
  u0: number
  u1: number
  z0: number
  z1: number
  fill: string
  line?: boolean
}) => {
  const corners: G3[] =
    plane === "se"
      ? [
          [at, u0, z1],
          [at, u1, z1],
          [at, u1, z0],
          [at, u0, z0],
        ]
      : [
          [u0, at, z1],
          [u1, at, z1],
          [u1, at, z0],
          [u0, at, z0],
        ]
  return (
    <polygon
      points={poly(corners)}
      fill={fill}
      stroke={line ? NAVY : "none"}
      strokeWidth={line ? 1.8 : 0}
      strokeLinejoin="round"
    />
  )
}

// A dashed mullion line on a wall plane.
const wallLine = ({
  plane,
  at,
  u,
  z0,
  z1,
  horizontal = false,
  u1,
  z,
}: {
  plane: "se" | "sw"
  at: number
  u: number
  z0: number
  z1: number
  horizontal?: boolean
  u1?: number
  z?: number
}) => {
  const p = (a: number, b: number): [number, number] =>
    plane === "se" ? iso(at, a, b) : iso(a, at, b)
  const [x1, y1] = horizontal ? p(u, z ?? 0) : p(u, z0)
  const [x2, y2] = horizontal ? p(u1 ?? u, z ?? 0) : p(u, z1)
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={NAVY} strokeWidth={1.6} />
}

const Tree = ({ gx, gy, s = 1 }: { gx: number; gy: number; s?: number }) => {
  const [bx, by] = iso(gx, gy)
  return (
    <g stroke={NAVY} strokeWidth={1.8} strokeLinecap="round">
      <line x1={bx} y1={by} x2={bx} y2={by - 14 * s} />
      <circle cx={bx} cy={by - 23 * s} r={10 * s} fill={MINT} />
      <circle cx={bx - 6 * s} cy={by - 16 * s} r={6.5 * s} fill={MINT_DARK} />
    </g>
  )
}

const Sparkle = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g stroke={COBALT} strokeWidth={2.2} strokeLinecap="round" opacity={0.85}>
    <line x1={x - 6 * s} y1={y} x2={x + 6 * s} y2={y} />
    <line x1={x} y1={y - 6 * s} x2={x} y2={y + 6 * s} />
  </g>
)

const Pin = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle className="svg-ping" r={14} fill={COBALT} opacity={0.35} />
    <path
      d="M0 9 C-8 -2 -11 -7 -11 -13 A 11 11 0 1 1 11 -13 C 11 -7 8 -2 0 9 Z"
      fill={COBALT}
      stroke={NAVY}
      strokeWidth={2}
    />
    <circle cy={-13} r={4.2} fill="#ffffff" />
  </g>
)

// Every scene shares the same stage: soft shadow, white platform, dashed
// inner ring for the "road" feel.
const Stage = () => (
  <>
    <ellipse cx={OX} cy={252} rx={148} ry={11} fill={NAVY} opacity={0.07} />
    <path d={roundedDiamond(0, 0.13)} fill="#ffffff" stroke={NAVY} strokeWidth={2.4} strokeLinejoin="round" />
    <path
      d={roundedDiamond(0.55, 0.1)}
      fill="none"
      stroke={ROAD}
      strokeWidth={2}
      strokeDasharray="8 10"
      strokeLinecap="round"
    />
  </>
)

// Flat white UI chips (booking card, search bar) sit outside the iso plane,
// the same way the hero's SOLD sign does — a sticker on the diorama.
const ChipShadow = ({ w, h }: { w: number; h: number }) => (
  <rect x={3} y={4} width={w} height={h} rx={11} fill={NAVY} opacity={0.12} />
)

// ── Salon: bookings ─────────────────────────────────────────────────────────
export const SalonScene = () => {
  const poleX = iso(5.9, 4.6)[0]
  const poleY = iso(5.9, 4.6)[1]
  const sign = iso(3.6, 4.8, 52)

  return (
    <svg
      viewBox="0 0 360 280"
      role="img"
      aria-label="Isometric illustration of a salon storefront with an online booking card floating beside it"
      className="h-auto w-full"
    >
      <defs>
        <clipPath id="fa-pole-a">
          <rect x={-5} y={-34} width={10} height={34} rx={5} />
        </clipPath>
      </defs>

      <Stage />

      {/* Salon storefront */}
      <Box x={2.2} y={1.8} w={3.4} d={3} h={62} />
      {/* Shopfront glass, SE wall */}
      {wallQuad({ plane: "se", at: 5.6, u0: 2.4, u1: 3.9, z0: 24, z1: 48, fill: GLASS })}
      {wallLine({ plane: "se", at: 5.6, u: 3.15, z0: 24, z1: 48 })}
      {wallLine({ plane: "se", at: 5.6, u: 2.4, u1: 3.9, z0: 0, z1: 0, horizontal: true, z: 36 })}
      {/* Door, SW wall */}
      {wallQuad({ plane: "sw", at: 4.8, u0: 3.2, u1: 4, z0: 0, z1: 26, fill: COBALT })}
      {/* Striped awning over the door */}
      {wallQuad({ plane: "sw", at: 4.8, u0: 2.95, u1: 4.1, z0: 34, z1: 42, fill: FACE_LEFT })}
      {wallQuad({ plane: "sw", at: 4.8, u0: 2.95, u1: 3.35, z0: 34, z1: 42, fill: COBALT, line: false })}
      {wallQuad({ plane: "sw", at: 4.8, u0: 3.7, u1: 4.1, z0: 34, z1: 42, fill: COBALT, line: false })}
      {/* Scissors sign, SW wall */}
      <circle cx={sign[0]} cy={sign[1]} r={9} fill="#ffffff" stroke={NAVY} strokeWidth={2} />
      <g stroke={NAVY} strokeWidth={1.4} strokeLinecap="round" fill="none">
        <line x1={sign[0] - 3.5} y1={sign[1] - 3.5} x2={sign[0] + 3} y2={sign[1] + 3} />
        <line x1={sign[0] + 3.5} y1={sign[1] - 3.5} x2={sign[0] - 3} y2={sign[1] + 3} />
        <circle cx={sign[0] - 3.2} cy={sign[1] + 4.4} r={1.6} />
        <circle cx={sign[0] + 3.2} cy={sign[1] + 4.4} r={1.6} />
      </g>

      {/* Barber pole at the front corner */}
      <g transform={`translate(${poleX} ${poleY}) rotate(-2)`}>
        <rect x={-5} y={-34} width={10} height={34} rx={5} fill="#ffffff" stroke={NAVY} strokeWidth={2} />
        <g clipPath="url(#fa-pole-a)" stroke="none">
          {Array.from({ length: 6 }, (_, i) => (
            <line key={i} x1={-6} y1={-38 + i * 7} x2={6} y2={-32 + i * 7} stroke={COBALT} strokeWidth={4} />
          ))}
        </g>
        <rect x={-6} y={-38} width={12} height={5} rx={2.5} fill={NAVY} />
        <rect x={-6} y={-1} width={12} height={5} rx={2.5} fill={NAVY} />
      </g>

      {/* Floating booking card */}
      <g transform="translate(230 34) rotate(3)">
        <ChipShadow w={102} h={48} />
        <rect width={102} height={48} rx={10} fill="#ffffff" stroke={NAVY} strokeWidth={2} />
        <rect x={10} y={12} width={16} height={16} rx={3} fill="#ffffff" stroke={NAVY} strokeWidth={1.8} />
        <line x1={10} y1={18} x2={26} y2={18} stroke={NAVY} strokeWidth={1.6} />
        <line x1={14} y1={9.5} x2={14} y2={13.5} stroke={NAVY} strokeWidth={1.6} strokeLinecap="round" />
        <line x1={22} y1={9.5} x2={22} y2={13.5} stroke={NAVY} strokeWidth={1.6} strokeLinecap="round" />
        <text x={33} y={22} fontSize={12} fontWeight={700} fill={NAVY} style={{ fontFamily: "var(--font-sans)" }}>
          9:30 AM
        </text>
        <text x={33} y={36} fontSize={8.5} fontWeight={700} fill={COBALT} letterSpacing={1.1} style={{ fontFamily: "var(--font-sans)" }}>
          BOOKED
        </text>
        <path d="M80 33 l2.6 2.6 L88 30" fill="none" stroke={COBALT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <Tree gx={1.4} gy={5} s={0.8} />
      <Tree gx={6} gy={5.6} s={0.72} />
      <Sparkle x={60} y={78} s={0.8} />
      <Sparkle x={306} y={120} s={0.7} />
    </svg>
  )
}

// ── Real estate: listings ──────────────────────────────────────────────────
export const ListingsScene = () => {
  const sign = iso(4.6, 6.4)

  return (
    <svg
      viewBox="0 0 360 280"
      role="img"
      aria-label="Isometric illustration of a real-estate office with a SOLD yard sign and a location pin"
      className="h-auto w-full"
    >
      <Stage />

      {/* Office tower */}
      <Box x={2.8} y={1.6} w={3.2} d={3.2} h={96} />
      {/* Full-height glass, SE wall */}
      {wallQuad({ plane: "se", at: 6, u0: 2.2, u1: 4, z0: 44, z1: 84, fill: GLASS })}
      {wallLine({ plane: "se", at: 6, u: 3.1, z0: 44, z1: 84 })}
      {wallLine({ plane: "se", at: 6, u: 2.2, u1: 4, z0: 0, z1: 0, horizontal: true, z: 64 })}
      {/* Ground-floor window, SE wall */}
      {wallQuad({ plane: "se", at: 6, u0: 3, u1: 4.2, z0: 22, z1: 34, fill: GLASS })}
      {/* Door, SW wall */}
      {wallQuad({ plane: "sw", at: 4.8, u0: 3.6, u1: 4.4, z0: 0, z1: 26, fill: COBALT })}
      {/* Rooftop plant room */}
      <Box x={3.3} y={2.1} w={1} d={1} h={12} z={96} />

      {/* SOLD yard sign */}
      <g transform={`translate(${sign[0]} ${sign[1]}) rotate(-4)`}>
        <line x1={0} y1={0} x2={0} y2={-20} stroke={NAVY} strokeWidth={2.2} strokeLinecap="round" />
        <rect x={-21} y={-41} width={42} height={21} rx={3} fill="#ffffff" stroke={NAVY} strokeWidth={2} />
        <text
          x={0}
          y={-26.5}
          textAnchor="middle"
          fontSize={10.5}
          fontWeight={800}
          fill={COBALT}
          style={{ fontFamily: "var(--font-display)" }}
        >
          SOLD
        </text>
      </g>

      <Pin x={250} y={40} s={0.95} />

      <Tree gx={6.3} gy={5.3} s={0.8} />
      <Tree gx={1.6} gy={5.2} s={0.75} />
      <Sparkle x={52} y={86} s={0.7} />
      <Sparkle x={318} y={150} s={0.65} />
    </svg>
  )
}

// ── Local search: the billboard ────────────────────────────────────────────
export const SearchScene = () => {
  const poleTop = iso(5.4, 6.6, 74)

  return (
    <svg
      viewBox="0 0 360 280"
      role="img"
      aria-label="Isometric illustration of a COBALT AXIS billboard beside a small storefront, with a search bar floating above"
      className="h-auto w-full"
    >
      <Stage />

      {/* Corner storefront */}
      <Box x={1.4} y={1.4} w={2.6} d={2.2} h={42} />
      {/* Awning with cobalt stripes, SE wall */}
      {wallQuad({ plane: "se", at: 4, u0: 1.7, u1: 3.1, z0: 34, z1: 42, fill: FACE_LEFT })}
      {wallQuad({ plane: "se", at: 4, u0: 1.8, u1: 2.2, z0: 34, z1: 42, fill: COBALT, line: false })}
      {wallQuad({ plane: "se", at: 4, u0: 2.6, u1: 3.0, z0: 34, z1: 42, fill: COBALT, line: false })}
      {/* Shopfront glass + door */}
      {wallQuad({ plane: "se", at: 4, u0: 1.8, u1: 3.0, z0: 10, z1: 30, fill: GLASS })}
      {wallQuad({ plane: "sw", at: 3.6, u0: 2.4, u1: 3.2, z0: 0, z1: 26, fill: COBALT })}
      <Pin x={150} y={78} s={0.85} />

      {/* Billboard */}
      <line
        x1={iso(5.4, 6.6, 0)[0]}
        y1={iso(5.4, 6.6, 0)[1]}
        x2={poleTop[0]}
        y2={poleTop[1]}
        stroke={NAVY}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <g transform={`translate(${poleTop[0]}, ${poleTop[1]}) skewY(26.565)`}>
        <rect x={-6} y={0} width={112} height={50} rx={8} fill={COBALT} stroke={NAVY} strokeWidth={2.2} />
        <text x={9} y={22} fontSize={14} fontWeight={700} fill="#ffffff" letterSpacing={0.8} style={{ fontFamily: "var(--font-display)" }}>
          COBALT
        </text>
        <text x={9} y={41} fontSize={14} fontWeight={700} fill="#ffffff" letterSpacing={0.8} style={{ fontFamily: "var(--font-display)" }}>
          AXIS
        </text>
      </g>

      {/* Floating search bar */}
      <g transform="translate(228 40) rotate(2)">
        <ChipShadow w={112} h={34} />
        <rect width={112} height={34} rx={17} fill="#ffffff" stroke={NAVY} strokeWidth={2} />
        <circle cx={18} cy={17} r={5.2} fill="none" stroke={NAVY} strokeWidth={2} />
        <line x1={22} y1={21} x2={26} y2={25} stroke={NAVY} strokeWidth={2} strokeLinecap="round" />
        <text x={33} y={21.5} fontSize={11} fontWeight={600} fill={NAVY} style={{ fontFamily: "var(--font-sans)" }}>
          near me
        </text>
      </g>

      <Tree gx={6.2} gy={4.4} s={0.7} />
      <Tree gx={2} gy={5.6} s={0.8} />
      <Sparkle x={62} y={120} s={0.75} />
      <Sparkle x={300} y={96} s={0.7} />
    </svg>
  )
}



