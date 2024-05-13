import styled from "styled-components";

export const NewsletterImageWrapper = styled.div`
  position: relative;
  width: 100%;
  color: white;
`;

export const NewsletterImageImg = styled.img`
  position: absolute;
  width: 100%;
  aspect-ratio: 3/2;
  object-fit: cover;
`;

export const NewsletterImageOverlay = styled.div`
  position: relative;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 3/2;
`;
