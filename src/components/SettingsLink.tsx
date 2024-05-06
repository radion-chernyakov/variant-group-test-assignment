"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import Text from "~/ui/Text"

export default function SettingsLink() {
  const linkRef = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === "KeyS" && e.altKey) {
        e.preventDefault()
        linkRef.current?.click()
      }
    }
    document.addEventListener("keyup", listener)
    return () => document.removeEventListener("keyup", listener)
  }, [])
  return (
    <Link scroll={false} ref={linkRef} href="/applications/settings">
      <Text>Settings</Text>
    </Link>
  )
}
