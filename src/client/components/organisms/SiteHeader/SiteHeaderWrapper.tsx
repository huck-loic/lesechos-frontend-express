import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const SiteHeaderWrapper = styled.header`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  background-color: var(--color-neutral-micro-contrast);
`;

export const SiteHeaderLink = styled(Link)`
  display: block;
  color: var(--color-neutral-hight-contrast);
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 700;
  border-radius: 0.5rem;

  &:hover {
    color: white;
    background-color: var(--color-neutral-hight-contrast);
  }
`;
