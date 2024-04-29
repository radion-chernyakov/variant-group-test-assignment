"use client";

import Button from "~/ui/Button";
import Plus from "~/ui/icons/Plus.svg";

export default function Text() {
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
    </>
  );
}
