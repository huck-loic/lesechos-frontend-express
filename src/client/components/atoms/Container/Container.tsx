import styled from "styled-components";

export default styled.div`
  position: relative;
  margin-inline: auto;
  padding-inline: 1rem;
  max-width: 1024px;

  @media screen and (min-width: 48rem) {
    padding-inline: 1.5rem;
  }

  @media screen and (min-width: 64rem) {
    padding-inline: 2rem;
  }
`;
