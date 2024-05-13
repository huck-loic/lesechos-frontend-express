import React from "react";
import { NewsletterImageImg, NewsletterImageOverlay, NewsletterImageWrapper } from "./NewsletterImageWrapper";

import type { PropsWithChildren } from "react";

type NewsletterImageProps = PropsWithChildren<{
  src: string;
  alt: string;
}>;

export default function NewsletterImage({ children, src, alt }: NewsletterImageProps) {
  return (
    <NewsletterImageWrapper>
      <NewsletterImageImg src={src} width={300} height={200} alt={alt} />
      <NewsletterImageOverlay>{children}</NewsletterImageOverlay>
    </NewsletterImageWrapper>
  );
}
