"use client";
import Button from "~/ui/Button";
import Text from "~/ui/Text";
import Plus from "~/ui/icons/Plus.svg";
import Header from "~/ui/Header";
import ApplicationLetter from "~/ui/ApplicationLetter";
import HitYourGoal from "~/ui/HitYourGoal";
import ProgressBar from "~/ui/ProgressBar";

console.log(
  Button,
  Text,
  Plus,
  Header,
  ApplicationLetter,
  HitYourGoal,
  ProgressBar
);

export default function Test() {
  return (
    <>
      <Button size="small" intent="submit" onClick={() => console.log("hey!")}>
        Create New
      </Button>
    </>
  );
}
