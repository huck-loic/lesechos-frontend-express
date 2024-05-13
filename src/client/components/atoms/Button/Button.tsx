import React from "react";
import { ButtonIntent, ButtonLoader, ButtonWrapper } from "./ButtonWrapper";

import type { PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  onClick: () => void;
  intent?: ButtonIntent;
  isLoading?: boolean;
}>;

export default function Button({ children, intent, isLoading, onClick }: ButtonProps) {
  return (
    <ButtonWrapper $intent={intent} $isLoading={isLoading} onClick={onClick} disabled={isLoading}>
      {children}
      {isLoading && <ButtonLoader />}
    </ButtonWrapper>
  );
}
