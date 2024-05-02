import { Suspense, type ReactNode } from "react"
import ApplicationsCounter from "~/applications/ApplicationCounter"
import Header from "~/ui/Header"

export default function ApplicationsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <Header
        userSection={
          <Suspense>
            <ApplicationsCounter />
          </Suspense>
        }
      />
      {children}
    </>
  )
}
