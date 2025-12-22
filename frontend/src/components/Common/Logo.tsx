import { Link } from "@tanstack/react-router"

import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import icon from "/assets/images/apex-icon.svg"
import iconLight from "/assets/images/apex-icon-light.svg"
import logo from "/assets/images/apex-logo.svg"
import logoLight from "/assets/images/apex-logo-light.svg"

interface LogoProps {
  variant?: "full" | "icon" | "responsive"
  className?: string
  asLink?: boolean
}

export function Logo({
  variant = "full",
  className,
  asLink = true,
}: LogoProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const fullLogo = isDark ? logoLight : logo
  const iconLogo = isDark ? iconLight : icon

  const baseTransition = "transition-all duration-300 ease-out"
  const hoverEffect = asLink
    ? "hover:opacity-80 hover:scale-[1.02] active:scale-[0.98]"
    : ""

  const content =
    variant === "responsive" ? (
      <div className={cn("relative", baseTransition, hoverEffect)}>
        <img
          src={fullLogo}
          alt="AIwithApex.com"
          className={cn(
            "h-7 w-auto group-data-[collapsible=icon]:hidden",
            baseTransition,
            className,
          )}
        />
        <img
          src={iconLogo}
          alt="AIwithApex.com"
          className={cn(
            "size-6 hidden group-data-[collapsible=icon]:block",
            baseTransition,
            className,
          )}
        />
      </div>
    ) : (
      <img
        src={variant === "full" ? fullLogo : iconLogo}
        alt="AIwithApex.com"
        className={cn(
          variant === "full" ? "h-7 w-auto" : "size-6",
          baseTransition,
          hoverEffect,
          className,
        )}
      />
    )

  if (!asLink) {
    return content
  }

  return (
    <Link
      to="/"
      className="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
    >
      {content}
    </Link>
  )
}
