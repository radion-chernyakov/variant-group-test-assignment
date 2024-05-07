declare module "react-window-scroller" {
  import type { ComponentType, Ref } from "react";
  import type { FixedSizeGridProps } from "react-window";

  export type ScrollerChildProps = {
    ref: Ref<FixedSizeGrid>;
    outerRef: FixedSizeGridProps["outerRef"];
    style: FixedSizeGridProps["style"];
    onScroll: FixedSizeGridProps["onScroll"];
  }

  export type ScrollerProps = {
    children: ComponentType<ScrollerChildProps>;
    isGrid?: boolean;
  }

  export const ReactWindowScroller: ComponentType<ScrollerProps>;
}
