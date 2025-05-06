import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useMediaQuery } from "@/lib/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Home, Search, Bell, Mail, Bookmark, User, MoreHorizontal, PenSquare, Menu, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"

export function Sidebar() {
  const [open, setOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const location = useLocation()
  
  // Close mobile sidebar when route changes
  useEffect(() => {
    if (isMobile && open) {
      setOpen(false)
    }
  }, [location.pathname, isMobile])

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Explore", href: "/explore" },
    { icon: Bell, label: "Notifications", href: "/notifications", badge: 5 },
    { icon: Mail, label: "Messages", href: "/messages", badge: 2 },
    { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: MoreHorizontal, label: "More", href: "/more" },
  ]

  const isActive = (href) => location.pathname === href

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between py-4">
      <div className="space-y-2 px-3">
        {/* Logo and Theme Toggle */}
        <div className="flex items-center justify-between mb-6 px-2">
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
          </Link>
          <ThemeToggle />
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center gap-4 px-3 py-3 text-lg font-medium rounded-full transition-colors relative group",
                isActive(item.href) 
                  ? "font-bold bg-accent/50" 
                  : "hover:bg-accent/30"
              )}
            >
              <div className="relative">
                <item.icon className={cn("h-6 w-6", isActive(item.href) && "stroke-[2.5px]")} />
                
                {/* Notification Badge */}
                {item.badge && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </div>
              
              <span className={cn(
                "hidden md:inline transition-opacity duration-200",
                isMobile ? "opacity-100" : "xl:opacity-100 opacity-0 group-hover:opacity-100"
              )}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Post Button */}
        <button className="w-full mt-6 rounded-full bg-blue-500 hover:bg-blue-600 text-white h-12 font-bold flex items-center justify-center transition-colors">
          <PenSquare className="h-5 w-5 md:mr-2 xl:mr-2" />
          <span className="hidden md:inline xl:inline">Post</span>
        </button>
      </div>

      {/* User Profile */}
      <div className="px-3 mt-auto">
        <button className="flex items-center gap-3 p-3 w-full rounded-full hover:bg-accent/30 transition-colors">
          <Avatar className="h-10 w-10 border-2 border-background">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-blue-500 text-white">U</AvatarFallback>
          </Avatar>
          <div className="hidden md:block xl:block text-left">
            <p className="font-semibold text-sm">Username</p>
            <p className="text-muted-foreground text-xs">@username</p>
          </div>
          <MoreHorizontal className="hidden md:block xl:block ml-auto h-5 w-5" />
        </button>
      </div>
    </div>
  )

  // Mobile view uses Sheet component
  if (isMobile) {
    return (
      <>
        <button
          className="fixed top-4 left-4 z-40 md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent 
            side="left" 
            className="p-0 max-w-[280px] border-r border-border bg-background"
            closeButton={false}
          >
            <button 
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 p-1 rounded-full hover:bg-accent/50"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </>
    )
  }

  // Desktop view with responsive width
  return (
    <div className="hidden md:flex h-screen sticky top-0 flex-shrink-0 border-r border-border bg-background transition-all duration-300 ease-in-out overflow-hidden hover:w-[275px] xl:hover:w-[275px]" style={{ width: 'var(--sidebar-width, 88px)' }}>
      {sidebarContent}
    </div>
  )
}