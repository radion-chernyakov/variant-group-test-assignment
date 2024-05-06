"use client"

import { vi } from "@faker-js/faker"
import stylex from "@stylexjs/stylex"
import {
  type CSSProperties,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react"
import { FixedSizeList as List, FixedSizeGrid as Grid } from "react-window"
import { ReactWindowScroller } from "react-window-scroller"
import Application from "~/ui/Application"

import { spacing, type MediaQuery } from "../ui/tokens.stylex"
import { useClientSettings } from "./clientSettings"
import { removeApplicationsById, useApplications } from "./store"

type Size = {
  height: number
  width: number
}

export default function ApplicationsList() {
  const sizeElementRef = useRef<HTMLDivElement>(null)
  const [vitrualListSize, setVitrualListSize] = useState<null | Size>(null)
  const settings = useClientSettings()
  const applications = useApplications()
  const deferredApplications = useDeferredValue(applications)

  const effectiveApplications = settings.deferredApplicationsRendering
    ? deferredApplications
    : applications

  useEffect(() => {
    if (!sizeElementRef.current) return

    console.log("kek")
    const rect = sizeElementRef.current.getBoundingClientRect()
    setVitrualListSize({
      height: rect.height,
      width: rect.width,
    })
  }, [sizeElementRef.current])

  if (!effectiveApplications || effectiveApplications.length === 0) return null
  console.log(vitrualListSize)

  return settings.virtualizedApplicationsRendering ? (
    <div ref={sizeElementRef} {...stylex.props(styles.virtualizedGrid)}>
      {vitrualListSize && (
        <ReactWindowScroller isGrid>
          {({ ref, outerRef, style, onScroll }) => (
            <Grid
              ref={ref}
              outerRef={outerRef}
              style={style}
              height={window.innerHeight}
              width={vitrualListSize.width}
              columnCount={3}
              columnWidth={vitrualListSize.width / 3}
              rowCount={effectiveApplications.length / 3}
              rowHeight={252}
              onScroll={onScroll}
            >
              {({
                columnIndex,
                rowIndex,
                style,
              }: {
                rowIndex: number
                columnIndex: number
                style: CSSProperties
              }) => {
                const application =
                  effectiveApplications[columnIndex * 3 + rowIndex]!
                return (
                  <div style={style}>
                    <Application
                      onDelete={() => removeApplicationsById(application.id)}
                      key={application.id}
                      application={application}
                    />
                  </div>
                )
              }}
            </Grid>
          )}
        </ReactWindowScroller>
      )}
    </div>
  ) : (
    <div {...stylex.props(styles.gridContainer)}>
      {effectiveApplications.map((application) => (
        <Application
          onDelete={() => removeApplicationsById(application.id)}
          key={application.id}
          application={application}
        />
      ))}
    </div>
  )
}

const mediumQuery: MediaQuery["medium"] = "@media (max-width: 768px)"

const styles = stylex.create({
  gridContainer: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr 1fr",
      [mediumQuery]: "1fr",
    },
    gap: spacing.small,
  },
  virtualizedGrid: {
    height: "100%",
  },
})
