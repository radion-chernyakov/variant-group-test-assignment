import { type ComponentProps, type ReactNode } from "react"
import Copy from "~/ui/icons/Copy.svg"
import copyToClipboard from "~/utils/copyToClipboard"

import Button from "../Button"

export default function CopyToClipboardButton({
  caption = "Copy to clipboard",
  text,
  iconPosition = "block-end",
  size = "small",
  alignSelf,
  intent = "functional",
}: {
  caption?: string
  text: string
} & Pick<
  ComponentProps<typeof Button>,
  "iconPosition" | "size" | "intent" | "alignSelf"
>) {
  return (
    <Button
      alignSelf={alignSelf}
      intent={intent}
      size={size}
      onClick={() => copyToClipboard(text)}
      icon={Copy}
      iconPosition={iconPosition}
    >
      {caption}
    </Button>
  )
}
