import { type ReactNode } from "react"
import Text from "~/ui/Text"

export default function Label({
  children,
  htmlFor,
}: {
  children: ReactNode
  htmlFor: string
}) {
  return (
    <Text as="label" htmlFor={htmlFor} size="xSmall" weight="medium">
      {children}
    </Text>
  )
}
