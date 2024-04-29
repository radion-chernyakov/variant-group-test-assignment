import * as stylex from "@stylexjs/stylex"
import Text from "~/ui/Text"

import Button from "../Button"
import ProgressBar from "../ProgressBar"
import { borderRadius, colors } from "../tokens.stylex"

export default function HitYourGoal({ progress }: { progress: number }) {
  return (
    <section {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.innerContainer)}>
        <div {...stylex.props(styles.topSection)}>
          <Text as="h2" size="large" weight="semibold" textAlign="center">
            Hit your goal
          </Text>
          <Text
            colorVariant="light"
            size="medium"
            weight="light"
            textAlign="center"
          >
            Generate and send out couple more job applications today to get
            hired faster
          </Text>
          <div {...stylex.props(styles.buttonContainer)}>
            <Button
              size="medium"
              intent="submit"
              onClick={() => console.log("click!")}
            >
              Create New
            </Button>
          </div>
        </div>
        <ProgressBar
          textStyle="full"
          progress={progress}
          progressStyle="rounded"
          layout="vertical"
        />
      </div>
    </section>
  )
}

const styles = stylex.create({
  container: {
    display: "flex",
    justifyContent: "center",
    paddingVertical: 54,
    paddingHorizontal: 64,
    borderRadius: borderRadius.section,
    backgroundColor: colors.green50,
  },
  innerContainer: {
    alignItems: "center",
    maxWidth: 480,
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  topSection: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
})
