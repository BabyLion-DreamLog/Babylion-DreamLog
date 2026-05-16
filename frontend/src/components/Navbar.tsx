"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "홈", href: "/" },
  { label: "내 책장", href: "/bookcase" },
  { label: "리포트", href: "/report" },
] as const;

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav style={{
      width: "100%",
      backgroundColor: "#fff",
      borderBottom: "0.5px solid #eee",
      padding: "0 60px",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 100,
      boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
    }}>
      <Link href="/" style={{ textDecoration: "none" }}>
        <span style={{ fontSize: "21px", fontWeight: "700", color: "#426b36", letterSpacing: "-0.5px" }}>
          DreamLog
        </span>
      </Link>

      <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
        {NAV_ITEMS.map(({ label, href }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
          return (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: "15px",
                color: active ? "#426b36" : "#6b7765",
                cursor: "pointer",
                fontWeight: active ? "600" : "400",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
