import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Settings, LogOut, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
import type { AuthContext } from "../../auth/useAuth";
import type { FlowModule, NavItem } from "../../types/module";
import logo from "../../assets/logo-white.png";

// ─── Props ────────────────────────────────────────────────────────────────────

interface SidebarProps {
  auth: AuthContext;
  modules: FlowModule[];
}

// ─── Single flat nav link ─────────────────────────────────────────────────────

function SidebarLink({
  item,
  pathname,
  indent = false,
}: {
  item: Omit<NavItem, "children">;
  pathname: string;
  indent?: boolean;
}) {
  const isActive = item.href === "/"
    ? pathname === "/"
    : pathname.startsWith(item.href);

  return (
    <Link
      to={item.href as any}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
        indent ? "py-2" : "py-2.5",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <item.icon className={cn(indent ? "h-4 w-4" : "h-5 w-5")} />
      {item.label}
    </Link>
  );
}

// ─── Collapsible group (for modules with children) ────────────────────────────

function SidebarGroup({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const groupActive = pathname.startsWith(item.href);
  const [open, setOpen] = useState(groupActive);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer",
          groupActive
            ? "text-sidebar-accent-foreground"
            : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        )}
      >
        <item.icon className="h-5 w-5" />
        <span className="flex-1 text-left">{item.label}</span>
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="ml-3 space-y-1">
          {item.children!.map((child) => (
            <SidebarLink
              key={child.href}
              item={child}
              pathname={pathname}
              indent
            />
          ))}
        </div>
      )}
    </>
  );
}

// ─── Main Sidebar ─────────────────────────────────────────────────────────────

export function Sidebar({ auth, modules }: SidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;

  const handleSignOut = async () => {
    await auth.signOut();
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar">
      <div className="flex h-full flex-col">

        {/* Logo */}
        <div className="flex h-20 items-center justify-center border-b border-sidebar-border px-4">
          <img src={logo} alt="Logo" className="h-24 w-auto" loading="eager" />
        </div>

        {/* Module nav — built from registered modules */}
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto sidebar-scroll">
          {modules.map((mod) =>
            mod.nav.children?.length ? (
              <SidebarGroup key={mod.id} item={mod.nav} pathname={pathname} />
            ) : (
              <SidebarLink key={mod.id} item={mod.nav} pathname={pathname} />
            )
          )}
        </nav>

        {/* Bottom: Settings + Sign out — always present */}
        <div className="border-t border-sidebar-border px-3 py-4">
          <SidebarLink
            item={{ label: "Instellingen", href: "/instellingen", icon: Settings }}
            pathname={pathname}
          />
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mt-1 cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            Uitloggen
          </button>
        </div>

      </div>
    </aside>
  );
}
