import React from "react";
import { HeadingMain, HeadingNewsletter, HeadingGroup } from "./HeadingWrapper";

import type { PropsWithChildren } from "react";

type HeadingProps = PropsWithChildren<{
  intent: "main" | "group" | "newsletter";
}>;

export default function Heading({ intent, children }: HeadingProps) {
  if (intent === "group") {
    return <HeadingGroup>{children}</HeadingGroup>;
  }

  if (intent === "newsletter") {
    return <HeadingNewsletter>{children}</HeadingNewsletter>;
  }

  return <HeadingMain>{children}</HeadingMain>;
}
