"use client"

import Image from "next/image"
import { useState } from "react"

/*
 * The isometric ecosystem artwork — an intelligent-engineering campus drawn in
 * the site's hand-drawn isometric style (thin navy linework, cobalt accents,
 * white surfaces, green details). It is intentionally unoptimized: a single
 * PNG keeps the fine technical linework crisp. The wrapper reserves the aspect
 * ratio so the labels around it never jump while the image decodes.
 *
 * The fallback only appears while the asset is missing from /public. It is a
 * neutral asset slot, not a replacement drawing — drop the artwork at the path
 * below and it renders automatically.
 */
export const EcosystemArt = () => {
  const [failed, setFailed] = useState(false)

  return (
    <div className="ecosystem-float relative z-10 mx-auto w-full max-w-[720px]">
      <div className="relative dark:rounded-[2rem] dark:bg-[#f4f5f8] dark:p-3">
        <div className="relative aspect-[1008/755] w-full overflow-hidden rounded-[1.25rem]">
          {failed ? (
            <div className="flex h-full w-full items-center justify-center bg-[#f7f8fa]">
              <div className="flex flex-col items-center gap-3 px-6 text-center">
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-primary/70 shadow-[0_0_12px_3px_color-mix(in_srgb,var(--primary)_25%,transparent)]"
                />
                <p className="font-mono text-[10px] tracking-[0.2em] text-[#5a6474] uppercase">
                  Ecosystem illustration
                </p>
                <p className="font-mono text-[11px] text-[#161d3a]/55">
                  /images/cobalt-ecosystem.png
                </p>
              </div>
            </div>
          ) : (
            <Image
              src="/images/cobalt-ecosystem.png"
              alt="Isometric illustration of the Cobalt Axis intelligent engineering campus — a central computing hub with server modules, sensor nodes and data pathways connecting the platform."
              fill
              unoptimized
              sizes="(min-width: 1024px) 52vw, (min-width: 640px) 86vw, 100vw"
              className="object-contain"
              onError={() => setFailed(true)}
              draggable={false}
            />
          )}
        </div>
      </div>
    </div>
  )
}
