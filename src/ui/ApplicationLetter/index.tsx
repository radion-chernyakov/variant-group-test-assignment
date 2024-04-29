"use client";
import { Fragment } from "react";
import * as stylex from "@stylexjs/stylex";
import { borderRadius, colors } from "../tokens.stylex";
import Text, { type Size as TextSize, getLineHeight } from "~/ui/Text";
import Button from "~/ui/Button";

type Application = {
  id: string;
  company: string;
  position: string;
  letter: string;
};

export default function ApplicationLetter({
  application,
  textSize = "medium",
}: {
  application: Application;
  textSize: TextSize;
}) {
  return (
    <section {...stylex.props(styles.container)}>
      <h2
        hidden
      >{`Application on ${application.position} position at ${application.company}`}</h2>
      <div {...stylex.props(styles.textWrapper)}>
        <Text style={styles.textClamp} size={textSize} weight="normal">
          {application.letter.split("\n").map((paragraph, index) => (
            <Fragment key={index}>
              <div key={index}>{paragraph}</div>
              <br />
            </Fragment>
          ))}
        </Text>
        <div {...stylex.props(styles.textGradientOverlay(textSize))} />
      </div>
      <div {...stylex.props(styles.buttonSection)}>
        <div {...stylex.props(styles.buttonWrapper)}>
          <Button
            intent="functional"
            size="small"
            onClick={() => console.log("delete")}
          >
            Delete
          </Button>
        </div>
        <div {...stylex.props(styles.buttonWrapper)}>
          <Button
            intent="functional"
            size="small"
            onClick={() => console.log("copy")}
          >
            Copy to clipboard
          </Button>
        </div>
      </div>
    </section>
  );
}

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.gray50,
    borderRadius: borderRadius.control,
    padding: "24px",
    color: colors.gray400,
    gap: "16px",
  },
  buttonSection: {
    display: "flex",
    justifyContent: "space-between",
  },
  // TODO: move into separate component
  textClamp: {
    display: "-webkit-box",
    // eslint-disable-next-line @stylexjs/valid-styles
    "-webkit-line-clamp": "6",
    // eslint-disable-next-line @stylexjs/valid-styles
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  textWrapper: {
    position: "relative",
  },
  textGradientOverlay: (textSize: TextSize) => ({
    position: "absolute",
    bottom: 0,
    height: 1.43 * getLineHeight(textSize),
    pointerEvents: "none",
    width: "100%",
    background: `linear-gradient(180deg, transparent 0%, ${colors.gray50} 100%)`,
  }),
});
