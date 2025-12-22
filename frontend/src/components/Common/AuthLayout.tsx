import { Appearance } from "@/components/Common/Appearance"
import { Logo } from "@/components/Common/Logo"
import { Footer } from "./Footer"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left Panel - Atmospheric Brand Display */}
      <div
        className={`
          relative hidden lg:flex lg:items-center lg:justify-center
          overflow-hidden

          /* Gradient mesh background */
          bg-[oklch(0.975_0.006_85)]
          dark:bg-[oklch(0.14_0.01_60)]
        `}
      >
        {/* Gradient mesh overlay */}
        <div
          className={`
            absolute inset-0 pointer-events-none
            bg-[radial-gradient(at_30%_20%,oklch(0.75_0.12_85/0.3)_0%,transparent_50%),radial-gradient(at_80%_80%,oklch(0.35_0.08_160/0.15)_0%,transparent_40%),radial-gradient(at_10%_90%,oklch(0.50_0.10_250/0.1)_0%,transparent_35%)]
            dark:bg-[radial-gradient(at_30%_20%,oklch(0.78_0.14_85/0.15)_0%,transparent_50%),radial-gradient(at_80%_80%,oklch(0.55_0.10_160/0.1)_0%,transparent_40%),radial-gradient(at_10%_90%,oklch(0.60_0.10_250/0.08)_0%,transparent_35%)]
          `}
        />

        {/* Subtle noise texture */}
        <div
          className={`
            absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay
            bg-[url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")]
          `}
        />

        {/* Decorative border accent */}
        <div
          className={`
            absolute right-0 top-1/4 bottom-1/4 w-px
            bg-gradient-to-b from-transparent via-border-strong to-transparent
            opacity-50
          `}
        />

        {/* Logo with subtle animation */}
        <div className="relative z-10 animate-[fadeInUp_0.6s_ease-out_forwards]">
          <Logo variant="full" className="h-20" asLink={false} />
        </div>
      </div>

      {/* Right Panel - Form Content */}
      <div
        className={`
          flex flex-col gap-4 p-6 md:p-10
          bg-background
          animate-[fadeInUp_0.5s_ease-out_forwards]
        `}
      >
        {/* Header with theme toggle */}
        <div className="flex justify-between items-center">
          {/* Mobile logo */}
          <div className="lg:hidden">
            <Logo variant="icon" className="h-8" />
          </div>
          <div className="lg:flex-1" />
          <Appearance />
        </div>

        {/* Form container */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">{children}</div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
