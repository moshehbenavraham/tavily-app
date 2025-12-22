import { FaGithub, FaLinkedinIn, FaYoutube } from "react-icons/fa"

const socialLinks = [
  {
    icon: FaGithub,
    href: "https://github.com/moshehbenavraham",
    label: "GitHub",
  },
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/moshehbenavraham/",
    label: "LinkedIn",
  },
  {
    icon: FaYoutube,
    href: "https://www.youtube.com/@AIwithApex",
    label: "YouTube",
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 py-6 px-8">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-muted-foreground/70 text-[13px] tracking-wide">
          <span className="font-medium text-muted-foreground">
            AIwithApex.com
          </span>
          <span className="mx-2 text-border">·</span>
          {currentYear}
        </p>
        <div className="flex items-center gap-1">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2.5 rounded-xl text-muted-foreground/60 hover:text-foreground hover:bg-muted/50 transition-all duration-200 ease-out"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
