import styled, { css } from "styled-components";
import Loader from "../Loader";

export type ButtonIntent = "follow" | "unfollow" | "subscribe";

export const ButtonWrapper = styled.button<{ $intent?: ButtonIntent; $isLoading?: boolean }>`
  position: relative;
  padding-inline: 1.5rem;
  padding-block: 0.75rem;
  margin-top: auto;
  border-radius: 99rem;
  font-size: 0.875rem;
  line-height: 1.1;
  font-weight: bold;
  background-color: var(--color-neutral-micro-contrast);
  cursor: pointer;
  outline: 0;
  border: none;

  ${(props) => {
    switch (props.$intent) {
      case "follow":
        return css`
          color: white;
          background-color: var(--color-primary);
        `;
      case "unfollow":
        return css`
          color: white;
          background-color: var(--color-neutral-hight-contrast);
        `;
      case "subscribe":
        return css`
          background-color: var(--color-subscription);
        `;
    }
  }}

  ${(props) => {
    if (props.$isLoading) {
      return css`
        padding-right: 2.5rem;
      `;
    }
  }}
`;

export const ButtonLoader = styled(Loader)`
  position: absolute;
  top: 0;
  right: 1rem;
  bottom: 0;
  margin: auto;
`;
