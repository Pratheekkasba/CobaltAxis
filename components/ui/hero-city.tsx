/*
 * HeroCity — a hand-built isometric diorama of a small-business city block:
 * a salon (with a working barber pole), a real-estate office, a café, and a
 * COBALT AXIS billboard. Drawn with real isometric math so every edge stays
 * consistent, in the site's exact palette. Pure SVG: crisp at any size,
 * animates with CSS, costs no image download.
 *
 * Grid: each plot is one unit on a 12×12 platform. Screen projection is the
 * classic 2:1 isometric: x = (gx − gy)·U, y = (gx + gy)·V − z.
 */

const U = 26
const V = 13
const OX = 450
const OY = 330

// Structural palette reads CSS tokens so the same SVG turns to dusk with the
// theme. Signage uses a fixed ink so text stays navy on its white plaques.
const INK = "var(--city-ink, #161d3a)"
const SIGN_INK = "#161d3a"
const FACE_RIGHT = "var(--city-face-right, #f3f4f9)" // SE-facing walls
const FACE_LEFT = "var(--city-face-left, #e9ecff)" // SW-facing walls
const GLASS = "var(--city-glass, #dfe6ff)"
const ROAD = "var(--city-road, #c3cae6)"
const PLATFORM = "var(--city-platform, #ffffff)"
const SHADOW = "var(--city-shadow, #161d3a)"
const COBALT = "#5669ff"
const MINT = "#0fb98b"
const MINT_DARK = "#04b488"

type G3 = [number, number, number]

// Project a grid coordinate + height to screen space.
const iso = (gx: number, gy: number, z = 0): [number, number] => [
  OX + (gx - gy) * U,
  OY + (gx + gy) * V - z,
]

// Render a list of corners as an SVG points string.
const poly = (corners: G3[]) =>
  corners
    .map(([gx, gy, z]) => {
      const [x, y] = iso(gx, gy, z)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")

const lerp = (
  a: [number, number],
  b: [number, number],
  t: number
): [number, number] => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]

// Rounded diamond path through four grid corners (the platform, road rings).
const roundedDiamond = (inset: number, round: number) => {
  const corners: G3[] = [
    [inset, inset, 0],
    [12 - inset, inset, 0],
    [12 - inset, 12 - inset, 0],
    [inset, 12 - inset, 0],
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
  top = PLATFORM,
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
  <g stroke={INK} strokeWidth={2.2} strokeLinejoin="round">
    <polygon points={poly([[x + w, y, z + h], [x + w, y + d, z + h], [x + w, y + d, z], [x + w, y, z]])} fill={right} />
    <polygon points={poly([[x, y + d, z + h], [x + w, y + d, z + h], [x + w, y + d, z], [x, y + d, z]])} fill={left} />
    <polygon points={poly([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={top} />
  </g>
)

// Quad on a wall plane: plane "se" = const gx (facing lower-right), "sw" =
// const gy (facing lower-left). u/v walk the two in-plane grid axes.
const wallQuad = ({
  plane,
  at,
  u0,
  u1,
  z0,
  z1,
  fill,
}: {
  plane: "se" | "sw"
  at: number
  u0: number
  u1: number
  z0: number
  z1: number
  fill: string
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
  return <polygon points={poly(corners)} fill={fill} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
}

const Tree = ({ gx, gy, s = 1 }: { gx: number; gy: number; s?: number }) => {
  const [bx, by] = iso(gx, gy)
  return (
    <g stroke={INK} strokeWidth={1.8} strokeLinecap="round">
      <line x1={bx} y1={by} x2={bx} y2={by - 16 * s} />
      <circle cx={bx} cy={by - 26 * s} r={11 * s} fill={MINT} />
      <circle cx={bx - 7 * s} cy={by - 18 * s} r={7.5 * s} fill={MINT_DARK} />
    </g>
  )
}

const Lamp = ({ gx, gy }: { gx: number; gy: number }) => {
  const [bx, by] = iso(gx, gy)
  return (
    <g stroke={INK} strokeWidth={2} strokeLinecap="round">
      <line x1={bx} y1={by} x2={bx} y2={by - 40} />
      <line x1={bx} y1={by - 40} x2={bx + 10} y2={by - 34} />
      <circle cx={bx + 11} cy={by - 32} r={3.4} fill={COBALT} strokeWidth={1.6} />
    </g>
  )
}

const Sparkle = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g stroke={COBALT} strokeWidth={2.4} strokeLinecap="round" opacity={0.85}>
    <line x1={x - 7 * s} y1={y} x2={x + 7 * s} y2={y} />
    <line x1={x} y1={y - 7 * s} x2={x} y2={y + 7 * s} />
  </g>
)

export const HeroCity = () => {
  // Road-marking dashes near the south corner (a zebra crossing).
  const crossing = Array.from({ length: 5 }, (_, i) => {
    const [x1, y1] = iso(4.7 + i * 0.42, 11.6)
    const [x2, y2] = iso(4.7 + i * 0.42, 10.6)
    return { x1, y1, x2, y2 }
  })

  return (
    <svg
      viewBox="0 0 900 720"
      role="img"
      aria-label="Isometric illustration of a small-business city block: a salon, a real-estate office and a café, with a COBALT AXIS billboard"
      className="h-full w-full"
    >
      <defs>
        <filter id="soft-blur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        {/* Clip for the barber pole stripes */}
        <clipPath id="pole-clip">
          <polygon points={poly([[6.6, 7.2, 52], [6.1, 7.2, 52], [6.1, 7.2, 0], [6.6, 7.2, 0]])} />
        </clipPath>
      </defs>

      {/* Ground shadow */}
      <ellipse cx={OX} cy={676} rx={296} ry={26} fill={SHADOW} opacity={0.09} filter="url(#soft-blur)" />

      {/* Platform + road markings */}
      <path d={roundedDiamond(0, 0.13)} fill={PLATFORM} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
      <path
        d={roundedDiamond(1, 0.08)}
        fill="none"
        stroke={ROAD}
        strokeWidth={2.4}
        strokeDasharray="10 13"
        strokeLinecap="round"
      />
      {crossing.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={ROAD} strokeWidth={4} strokeLinecap="round" />
      ))}

      {/* ── Real-estate office (tall, centre-back) ── */}
      <g>
      <Box x={4.5} y={2.5} w={4} d={3.5} h={150} />
      {/* Big glass window, SE wall */}
      {wallQuad({ plane: "se", at: 8.5, u0: 3.2, u1: 5.3, z0: 45, z1: 115, fill: GLASS })}
      <line
        x1={iso(8.5, 4.25, 45)[0]}
        y1={iso(8.5, 4.25, 45)[1]}
        x2={iso(8.5, 4.25, 115)[0]}
        y2={iso(8.5, 4.25, 115)[1]}
        stroke={INK}
        strokeWidth={1.8}
      />
      <line
        x1={iso(8.5, 3.2, 80)[0]}
        y1={iso(8.5, 3.2, 80)[1]}
        x2={iso(8.5, 5.3, 80)[0]}
        y2={iso(8.5, 5.3, 80)[1]}
        stroke={INK}
        strokeWidth={1.8}
      />
      {/* Door, SW wall */}
      {wallQuad({ plane: "sw", at: 6, u0: 5.9, u1: 7.1, z0: 0, z1: 32, fill: COBALT })}
      {/* Rooftop plant room + antenna */}
      <Box x={5.2} y={3.2} w={1} d={1} h={14} z={150} />
      <line
        x1={iso(7.9, 3.7, 150)[0]}
        y1={iso(7.9, 3.7, 150)[1]}
        x2={iso(7.9, 3.7, 190)[0]}
        y2={iso(7.9, 3.7, 190)[1]}
        stroke={INK}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <circle cx={iso(7.9, 3.7, 190)[0]} cy={iso(7.9, 3.7, 190)[1]} r={3.4} fill={COBALT} />
      </g>

      {/* ── Café (back-left) ── */}
      <g>
      <Box x={1} y={1} w={3} d={3} h={85} />
      {/* Striped awning band, SW wall */}
      {wallQuad({ plane: "sw", at: 4, u0: 1, u1: 4, z0: 46, z1: 62, fill: FACE_LEFT })}
      {Array.from({ length: 3 }, (_, i) => (
        <polygon
          key={i}
          points={poly([
            [1.15 + i * 0.95, 4, 62],
            [1.6 + i * 0.95, 4, 62],
            [1.6 + i * 0.95, 4, 46],
            [1.15 + i * 0.95, 4, 46],
          ])}
          fill={COBALT}
          stroke="none"
        />
      ))}
      {/* Window + door, SE wall */}
      {wallQuad({ plane: "se", at: 4, u0: 1.7, u1: 2.9, z0: 38, z1: 62, fill: GLASS })}
      {wallQuad({ plane: "se", at: 4, u0: 1.7, u1: 2.5, z0: 0, z1: 30, fill: COBALT })}
      {/* Hanging sign */}
      <line
        x1={iso(2.5, 4, 85)[0]}
        y1={iso(2.5, 4, 85)[1]}
        x2={iso(2.5, 4.4, 76)[0]}
        y2={iso(2.5, 4.4, 76)[1]}
        stroke={INK}
        strokeWidth={2}
      />
      <circle cx={iso(2.5, 4.4, 68)[0]} cy={iso(2.5, 4.4, 68)[1]} r={9} fill="#ffffff" stroke={SIGN_INK} strokeWidth={2} />
      <text
        x={iso(2.5, 4.4, 68)[0]}
        y={iso(2.5, 4.4, 68)[1] + 3.5}
        textAnchor="middle"
        fontSize={8.5}
        fontWeight={700}
        fill={SIGN_INK}
        style={{ fontFamily: "var(--font-display)" }}
      >
        CAFÉ
      </text>
      </g>

      {/* ── Salon (front-right) ── */}
      <g>
      <Box x={6.5} y={7} w={4} d={3.5} h={75} />
      {/* Shopfront glass, SE wall */}
      {wallQuad({ plane: "se", at: 10.5, u0: 7.6, u1: 9.4, z0: 18, z1: 58, fill: GLASS })}
      <line
        x1={iso(10.5, 8.5, 18)[0]}
        y1={iso(10.5, 8.5, 18)[1]}
        x2={iso(10.5, 8.5, 58)[0]}
        y2={iso(10.5, 8.5, 58)[1]}
        stroke={INK}
        strokeWidth={1.8}
      />
      {/* Door, SW wall */}
      {wallQuad({ plane: "sw", at: 10.5, u0: 9.3, u1: 10.2, z0: 0, z1: 30, fill: COBALT })}
      {/* Small striped awning over the door, SW wall */}
      {wallQuad({ plane: "sw", at: 10.5, u0: 9.1, u1: 10.4, z0: 44, z1: 54, fill: FACE_LEFT })}
      {Array.from({ length: 2 }, (_, i) => (
        <polygon
          key={i}
          points={poly([
            [9.25 + i * 0.65, 10.5, 54],
            [9.55 + i * 0.65, 10.5, 54],
            [9.55 + i * 0.65, 10.5, 44],
            [9.25 + i * 0.65, 10.5, 44],
          ])}
          fill={COBALT}
          stroke="none"
        />
      ))}
      {/* Scissors sign */}
      <circle cx={iso(7.7, 10.5, 68)[0]} cy={iso(7.7, 10.5, 68)[1]} r={13} fill="#ffffff" stroke={SIGN_INK} strokeWidth={2.2} />
      <g stroke={SIGN_INK} strokeWidth={1.8} strokeLinecap="round">
        <line
          x1={iso(7.7, 10.5, 68)[0] - 5}
          y1={iso(7.7, 10.5, 68)[1] - 5}
          x2={iso(7.7, 10.5, 68)[0] + 4}
          y2={iso(7.7, 10.5, 68)[1] + 5}
        />
        <line
          x1={iso(7.7, 10.5, 68)[0] + 5}
          y1={iso(7.7, 10.5, 68)[1] - 5}
          x2={iso(7.7, 10.5, 68)[0] - 4}
          y2={iso(7.7, 10.5, 68)[1] + 5}
        />
        <circle cx={iso(7.7, 10.5, 68)[0] - 4.5} cy={iso(7.7, 10.5, 68)[1] + 6.5} r={2.2} fill="none" />
        <circle cx={iso(7.7, 10.5, 68)[0] + 4.5} cy={iso(7.7, 10.5, 68)[1] + 6.5} r={2.2} fill="none" />
      </g>

      {/* Barber pole with flowing stripes */}
      <Box x={6.1} y={6.7} w={0.5} d={0.5} h={55} />
      <g clipPath="url(#pole-clip)">
        <g className="barber-flow" stroke="none">
          {Array.from({ length: 11 }, (_, i) => (
            <polygon
              key={i}
              points={poly([
                [6.6, 7.2, i * 9],
                [6.1, 7.2, i * 9 + 4.5],
                [6.1, 7.2, i * 9 + 9],
                [6.6, 7.2, i * 9 + 4.5],
              ])}
              fill={i % 2 === 0 ? COBALT : "#ffffff"}
            />
          ))}
        </g>
      </g>
      {/* Pole caps */}
      <Box x={6.02} y={6.62} w={0.66} d={0.66} h={6} z={55} top={SIGN_INK} right={SIGN_INK} left={SIGN_INK} />
      </g>

      {/* ── Billboard (front-left) ── */}
      <line
        x1={iso(1.5, 8.5, 0)[0]}
        y1={iso(1.5, 8.5, 0)[1]}
        x2={iso(1.5, 8.5, 92)[0]}
        y2={iso(1.5, 8.5, 92)[1]}
        stroke={INK}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <g transform={`translate(${iso(1.5, 8.5, 92)[0]}, ${iso(1.5, 8.5, 92)[1] - 74}) skewY(26.565)`}>
        <rect x={-6} y={0} width={152} height={72} rx={10} fill={COBALT} stroke={SIGN_INK} strokeWidth={2.4} />
        <text x={14} y={32} fontSize={20} fontWeight={700} fill="#ffffff" letterSpacing={1}>
          COBALT
        </text>
        <text x={14} y={56} fontSize={20} fontWeight={700} fill="#ffffff" letterSpacing={1}>
          AXIS
        </text>
      </g>
      {/* Support struts */}
      <line
        x1={iso(1.5, 8.5, 92)[0]}
        y1={iso(1.5, 8.5, 92)[1]}
        x2={iso(1.5, 8.5, 92)[0] - 2}
        y2={iso(1.5, 8.5, 92)[1] - 70}
        stroke={INK}
        strokeWidth={2.4}
      />

      {/* ── SOLD yard sign (real-estate) ── */}
      <g transform={`translate(${iso(9.4, 6.9, 0)[0]}, ${iso(9.4, 6.9, 0)[1]}) rotate(-3)`}>
        <line x1={0} y1={0} x2={0} y2={-22} stroke={SIGN_INK} strokeWidth={2.4} strokeLinecap="round" />
        <rect x={-19} y={-42} width={38} height={21} rx={3} fill="#ffffff" stroke={SIGN_INK} strokeWidth={2.2} />
        <text x={0} y={-27.5} textAnchor="middle" fontSize={11} fontWeight={800} fill={COBALT}>
          SOLD
        </text>
      </g>

      {/* ── Map pin over the salon ── */}
      <g transform={`translate(${iso(8.2, 8.2, 130)[0]}, ${iso(8.2, 8.2, 130)[1]})`}>
        <circle className="svg-ping" r={16} fill={COBALT} opacity={0.5} />
        <path
          d="M0 10 C -9 -2, -12 -8, -12 -14 A 12 12 0 1 1 12 -14 C 12 -8, 9 -2, 0 10 Z"
          fill={COBALT}
          stroke={SIGN_INK}
          strokeWidth={2}
        />
        <circle cx={0} cy={-14} r={4.6} fill="#ffffff" />
      </g>

      {/* ── Greenery + street furniture ── */}
      <Tree gx={2.9} gy={2.1} s={0.85} />
      <Tree gx={1.4} gy={5.9} s={1.05} />
      <Tree gx={10.9} gy={4.6} s={1.15} />
      <Tree gx={11.1} gy={9.3} s={0.9} />
      <Tree gx={5.3} gy={11.4} s={0.75} />
      <Lamp gx={7.9} gy={11.3} />
      <Lamp gx={11.4} gy={6.4} />

      {/* Sparkles */}
      <Sparkle x={250} y={120} s={0.9} />
      <Sparkle x={660} y={180} s={0.7} />
      <Sparkle x={820} y={330} s={0.6} />
    </svg>
  )
}
