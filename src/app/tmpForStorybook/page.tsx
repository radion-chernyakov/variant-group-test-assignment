"use client"

import ApplicationForm from "~/components/ApplicationForm"
import ApplicationLetter from "~/ui/ApplicationLetter"
import ApplicationLetterPreview from "~/ui/ApplicationLetterPreview"
import Button from "~/ui/Button"
import Header from "~/ui/Header"
import HitYourGoal from "~/ui/HitYourGoal"
import Input from "~/ui/Input"
import Label from "~/ui/Label"
import ProgressBar from "~/ui/ProgressBar"
import Text from "~/ui/Text"
import Textarea from "~/ui/Textarea"
import Plus from "~/ui/icons/Plus.svg"

console.log(
  Button,
  Text,
  Plus,
  Header,
  ApplicationLetter,
  HitYourGoal,
  ProgressBar,
  ApplicationLetterPreview,
  Label,
  Input,
  Textarea,
  ApplicationForm,
)

export default function Test() {
  return (
    <>
      <Button size="small" intent="submit" onClick={() => console.log("hey!")}>
        Create New
      </Button>
    </>
  )
}
