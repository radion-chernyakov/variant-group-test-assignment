"use client";
import { type ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import { type StyleXStyles } from "@stylexjs/stylex/lib/StyleXTypes";
import { sizeTokens, weightTokens } from "./tokens.stylex";

export type Size = "xSmall" | "small" | "medium" | "large" | "xLarge";

type Weight = "light" | "normal" | "medium" | "semibold" | "bold";

export default function Text({
  size,
  weight = "normal",
  children,
  style,
}: {
  size: Size;
  weight: Weight;
  children: ReactNode;
  style: StyleXStyles;
}) {
  const sizeTheme = sizeMap[size];
  const weightTheme = weightMap[weight];
  return (
    <div {...stylex.props(weightTheme, sizeTheme, styles.base, style)}>
      {children}
    </div>
  );
}

const styles = stylex.create({
  base: {
    fontVariationSettings: "'wdth' 80",
    fontWeight: weightTokens.fontWeight,
    fontSize: sizeTokens.fontSize,
    lineHeight: 1.56,
  },
});

const xSmallSizeTheme = stylex.createTheme(sizeTokens, {
  fontSize: "14px",
  lineHeight: "20px",
});

const mediumSizeTheme = stylex.createTheme(sizeTokens, {
  fontSize: "18px",
  lineHeight: "28px",
});

const largeSizeTheme = stylex.createTheme(sizeTokens, {
  fontSize: "36px",
  lineHeight: "44px",
});

const xLargeSizeTheme = stylex.createTheme(sizeTokens, {
  fontSize: "48px",
  lineHeight: "60px",
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
