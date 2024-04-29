import { type ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import { type StyleXStyles } from "@stylexjs/stylex/lib/StyleXTypes";
import { sizeTokens, weightTokens, smallLineHeight } from "./tokens.stylex";

export type Size = "xSmall" | "small" | "medium" | "large" | "xLarge";

type Weight = "light" | "normal" | "medium" | "semibold" | "bold";

type AsTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "label" | "p";

export default function Text({
  size,
  weight = "normal",
  children,
  style,
  as: As = "p",
}: {
  size: Size;
  weight: Weight;
  children: ReactNode;
  style: StyleXStyles;
  as?: AsTag;
}) {
  const sizeTheme = sizeMap[size];
  const weightTheme = weightMap[weight];
  return (
    <As {...stylex.props(weightTheme, sizeTheme, styles.base, style)}>
      {children}
    </As>
  );
}

const styles = stylex.create({
  base: {
    fontVariationSettings: "'wdth' 80",
    fontWeight: weightTokens.fontWeight,
    fontSize: sizeTokens.fontSize,
    lineHeight: sizeTokens.lineHeight,
  },
});

const lineHeightMap: Record<Size, number> = {
  xSmall: 20,
  small: smallLineHeight,
  medium: 28,
  large: 44,
  xLarge: 60,
};

export const getLineHeight = (size: Size) => lineHeightMap[size];

const xSmallSizeTheme = stylex.createTheme(sizeTokens, {
  fontSize: "14px",
  lineHeight: `${lineHeightMap.xSmall}px`,
});

const mediumSizeTheme = stylex.createTheme(sizeTokens, {
  fontSize: "18px",
  lineHeight: `${lineHeightMap.medium}px`,
});

const largeSizeTheme = stylex.createTheme(sizeTokens, {
  fontSize: "36px",
  lineHeight: `${lineHeightMap.large}px`,
});

const xLargeSizeTheme = stylex.createTheme(sizeTokens, {
  fontSize: "48px",
  lineHeight: `${lineHeightMap.xLarge}px`,
});

const sizeMap = {
  xSmall: xSmallSizeTheme,
  small: undefined,
  medium: mediumSizeTheme,
  large: largeSizeTheme,
  xLarge: xLargeSizeTheme,
};

const lightWeightTheme = stylex.createTheme(weightTokens, {
  fontWeight: 300,
});

const mediumWeightTheme = stylex.createTheme(weightTokens, {
  fontWeight: 500,
});
const semiboldWeightTheme = stylex.createTheme(weightTokens, {
  fontWeight: 600,
});
const boldWeightTheme = stylex.createTheme(weightTokens, {
  fontWeight: 700,
});

const weightMap = {
  light: lightWeightTheme,
  normal: undefined,
  medium: mediumWeightTheme,
  semibold: semiboldWeightTheme,
  bold: boldWeightTheme,
};
