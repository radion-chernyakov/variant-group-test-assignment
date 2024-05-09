"use client"

import stylex from "@stylexjs/stylex"
import {
  type CSSProperties,
  useDeferredValue,
  useRef,
  useState,
  useLayoutEffect,
} from "react"
import { FixedSizeGrid as Grid } from "react-window"
import {
  ReactWindowScroller,
  type ScrollerChildProps,
} from "react-window-scroller"
import Application, {
  calculateHeight,
  ApplicationSkeleton,
} from "~/ui/Application"
import { mapResult } from "~/utils/result"

import {
  type ExtractPXVarValue,
  spacing,
  type MediaQuery,
  type ScreenWidth,
} from "../ui/tokens.stylex"
import { useClientSettings } from "./clientSettings"
import {
  removeApplicationsById,
  useApplications,
  type Application as ApplicationType,
} from "./store"

const mediumWidth: ScreenWidth["medium"] = 768

const textSize = "medium"
const linesCount = 6

export default function ApplicationsList() {
  const settings = useClientSettings()
  const applications = useApplications()
  const deferredApplications = useDeferredValue(applications.data ?? [])

  return mapResult(applications, {
    onError: () => null, // TODO: handle error
    onLoading: () => <Skeleton />, // TODO: handle loading
    onData: (applications) => {
      const effectiveApplications = settings.deferredApplicationsRendering
        ? deferredApplications
        : applications

      if (!effectiveApplications || effectiveApplications.length === 0)
        return null

      if (settings.virtualizedApplicationsRendering) {
        return (
          <VirtualizedGridListWrapper applications={effectiveApplications} />
        )
      } else {
        return <NativeGridList applications={effectiveApplications} />
      }
    },
  })
}

function Skeleton() {
  return (
    <div {...stylex.props(styles.gridContainer)} id="kek!">
      <ApplicationSkeleton />
      <ApplicationSkeleton />
      <ApplicationSkeleton />
    </div>
  )
}

function NativeGridList({ applications }: { applications: ApplicationType[] }) {
  return (
    <div {...stylex.props(styles.gridContainer)}>
      {applications.map((application) => (
        <Application
          linesCount={linesCount}
          textSize={textSize}
          onDelete={() => removeApplicationsById(application.id)}
          key={application.id}
          application={application}
        />
      ))}
    </div>
  )
}

function VirtualizedGridListWrapper({
  applications,
}: {
  applications: ApplicationType[]
}) {
  const sizeElementRef = useRef<HTMLDivElement>(null)
  const [virtualListWidth, setVirtualListWidth] = useState<null | number>(null)
  useLayoutEffect(() => {
    if (!sizeElementRef.current) return
    const rect = sizeElementRef.current.getBoundingClientRect()
    setVirtualListWidth(rect.width)

    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect
      if (!rect) return
      setVirtualListWidth(rect.width)
    })
    observer.observe(sizeElementRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sizeElementRef} {...stylex.props(styles.virtualizedGridWrapper)}>
      {virtualListWidth && (
        <VirtualizedGridList
          applications={applications}
          virtualListWidth={virtualListWidth}
        />
      )}
    </div>
  )
}

const itemHeight = calculateHeight(textSize, linesCount)
const gap = spacing.small
const gapSize: ExtractPXVarValue<typeof gap> = 8
const rowHeight = itemHeight + gapSize

function VirtualizedGridList({
  applications,
  virtualListWidth,
}: {
  applications: ApplicationType[]
  virtualListWidth: number
}) {
  const columnsCount = virtualListWidth <= mediumWidth ? 1 : 2
  const columnWidth = virtualListWidth / columnsCount

  const rowCount = Math.ceil(applications.length / columnsCount)

  return (
    <div {...stylex.props(styles.virtualizedGrid(rowCount, rowHeight))}>
      <ReactWindowScroller isGrid>
        {({ ref, outerRef, style, onScroll }: ScrollerChildProps) => (
          <Grid
            ref={ref}
            outerRef={outerRef}
            style={style}
            height={window.innerHeight}
            width={virtualListWidth}
            columnCount={columnsCount}
            columnWidth={columnWidth}
            rowCount={rowCount}
            rowHeight={rowHeight}
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
              const index = columnIndex + rowIndex * columnsCount
              const application = applications[index]
              if (!application) return null
              return (
                <div
                  data-application-id={application.id}
                  data-application-index={index}
                  style={style}
                  {...stylex.props(styles.virtualGridCell)}
                >
                  <div
                    {...stylex.props(
                      styles.virtualGridItemContainer(columnWidth, rowHeight),
                    )}
                  >
                    <Application
                      linesCount={linesCount}
                      textSize={textSize}
                      onDelete={() => removeApplicationsById(application.id)}
                      key={application.id}
                      application={application}
                    />
                  </div>
                </div>
              )
            }}
          </Grid>
        )}
      </ReactWindowScroller>
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
    gap,
  },
  virtualizedGrid: (rowCount: number, rowHeight: number) => ({
    height: `calc(${rowHeight}px * ${rowCount})`,
  }),
  virtualizedGridWrapper: {
    margin: `calc(${spacing.small} * -1 / 2)`,
    // negative margin to visually remove "gap" from outer grid cells
    // and add space for hover effect
  },
  virtualGridCell: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  virtualGridItemContainer: (columnWidth: number, rowHeight: number) => ({
    width: `calc(${columnWidth}px - ${spacing.small})`,
    height: `calc(${rowHeight}px - ${spacing.small})`,
  }),
})
