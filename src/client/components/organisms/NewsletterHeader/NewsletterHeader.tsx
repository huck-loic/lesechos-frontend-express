import React from "react";
import Heading from "../../../components/atoms/Heading";
import Container from "../../atoms/Container";
import { NewsletterHeaderContainer } from "./NewsletterHeaderWrapper";

type NewsletterHeaderProps = {
  title: string;
  description: string;
};

export default function NewsletterHeader({ title, description }: NewsletterHeaderProps) {
  return (
    <Container>
      <NewsletterHeaderContainer>
        <Heading intent="main">{title}</Heading>
        <p>{description}</p>
      </NewsletterHeaderContainer>
    </Container>
  );
}
