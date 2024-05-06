"use client"

import { Overlay, useModalOverlay } from "@react-aria/overlays"
import * as stylex from "@stylexjs/stylex"
import { useRouter } from "next/navigation"
import React, { useRef, type ReactNode } from "react"
import CloseIcon from "~/ui/icons/Close.svg"

import Button from "../Button"
import {
  type MediaQuery,
  backgroundColors,
  borderRadius,
  paddings,
  zIndex,
} from "../tokens.stylex"

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter()
  const ref = useRef(null)
  const { modalProps, underlayProps } = useModalOverlay(
    {
      isDismissable: true,
      isKeyboardDismissDisabled: true,
    },
    {
      isOpen: true,
      setOpen: () => {
        // Only Next routes triggers modal open
      },
      open: () => {
        // Only Next routes triggers modal open
      },
      close: () => router.back(),
      toggle: () => router.back(),
    },
    ref,
  )

  return (
    <Overlay>
      <div {...underlayProps} {...stylex.props(style.overlay)}>
        <div
          role="dialog"
          ref={ref}
          {...modalProps}
          {...stylex.props(style.container)}
        >
          <Button
            intent="functional"
            size="small"
            alignSelf="flex-end"
            icon={CloseIcon}
            onClick={() => router.back()}
            label="Close"
          />
          {children}
        </div>
      </div>
    </Overlay>
  )
}

const smallMediaQuery: MediaQuery["small"] = "@media (max-width: 480px)"

const style = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    padding: {
      [smallMediaQuery]: paddings.small,
      default: paddings.large,
    },
    width: {
      [smallMediaQuery]: "100%",
      default: "80%",
    },
    height: {
      [smallMediaQuery]: "100%",
      default: "80%",
    },
    borderStyle: "solid",
    borderColor: backgroundColors.gray,
    backgroundColor: backgroundColors.gray,
    borderRadius: {
      [smallMediaQuery]: 0,
      default: borderRadius.section,
    },
  },
  overlay: {
    inset: "0px",
    position: "fixed",
    zIndex: zIndex.modal,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "grayscale(50%) blur(5px)",
    transition: "backdrop-filter 0.5s ease-in-out",
  },
})
