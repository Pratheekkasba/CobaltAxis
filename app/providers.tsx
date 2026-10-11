"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import { ProjectDrawer } from "@/components/ui/project-drawer"
import { Preloader } from "@/components/ui/preloader"
import { SmoothScroll } from "@/components/providers/smooth-scroll"
import { ReactNode, Suspense, useState } from "react"

type ProvidersProps = {
  children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        <SmoothScroll>
          <Preloader />
          <Suspense>{children}</Suspense>
          <ProjectDrawer />
          <Toaster />
        </SmoothScroll>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
