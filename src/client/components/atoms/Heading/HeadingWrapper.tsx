import styled from "styled-components";

export const HeadingMain = styled.h1`
  font-size: 1.875rem;
  text-transform: uppercase;
  font-weight: 700;
`;

export const HeadingGroup = styled.h2`
  position: relative;
  display: inline-block;
  font-size: 1.375rem;
  text-transform: uppercase;
  font-weight: 700;
  padding-bottom: 1rem;
  margin-bottom: 1.25rem;
  &::after {
    content: " ";
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    height: 0.25rem;
    width: 100%;
    max-width: 4.375rem;
    border-radius: 0.25rem;
    background-color: var(--color-primary);
  }
`;

export const HeadingNewsletter = styled.h3`
  font-family: var(--font-serif);
  font-size: 1.875rem;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  letter-spacing: -1%;
  line-height: 1.2;
  font-weight: 700;
`;
