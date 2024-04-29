"use client";
import Button from "~/ui/Button";
import Text from "~/ui/Text";
import Plus from "~/ui/icons/Plus.svg";
import Header from "~/ui/Header";
import ApplicationLetter from "~/ui/ApplicationLetter";
import HitYourGoal from "~/ui/HitYourGoal";
import ProgressBar from "~/ui/ProgressBar";

console.log(Header, ApplicationLetter, HitYourGoal, ProgressBar);

export default function Test() {
  return (
    <>
      <Button size="small" intent="submit" onClick={() => console.log("hey!")}>
        Create New
      </Button>
      <Button
        onClick={() => {
          console.log("kek");
        }}
        size="medium"
        intent="submit"
        icon={Plus}
        iconPosition="block-end"
      >
        Create New
      </Button>
      <Button
        onClick={() => {
          console.log("kek");
        }}
        size="medium"
        intent="submit"
        icon={Plus}
        iconPosition="block-start"
      >
        Create New
      </Button>
      <Text weight="normal">Hello</Text>
      <Text size="medium" weight="semibold">
        Create New
      </Text>
      <Text weight="semibold" size="large">
        Product manager, Apple
      </Text>
      <Text weight="medium" size="xSmall">
        Job title
      </Text>
      <Text>Hello</Text>
    </>
  );
}
