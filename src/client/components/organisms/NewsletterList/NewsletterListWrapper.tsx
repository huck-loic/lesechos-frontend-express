import styled from "styled-components";

export const NewsletterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media screen and (min-width: 40rem) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (min-width: 48rem) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const NewsletterCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-block: 2rem;
`;

export const NewsletterError = styled.div`
  width: 100%;
  padding: 1.5rem;
  margin-block: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  color: white;
  background-color: var(--color-primary);
`;
