import React from "react";
import Heading from "../../../components/atoms/Heading";

import Card from "../../../components/molecules/Card";
import NewsletterImage from "../../../components/atoms/NewsletterImage";
import { NewsletterGrid, NewsletterCenter, NewsletterError } from "./NewsletterListWrapper";
import NewsletterButton from "../../../components/atoms/NewsletterButton";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getNewslettersForUser } from "../../../../shared/services/get-newsletters-for-user";
import { groupNewslettersBySite } from "../../../../shared/services/transforms/group-newsletters-by-site";
import Loader from "../../atoms/Loader";
import Container from "../../atoms/Container";
import Button from "../../atoms/Button";

export default function NewslettersList() {
  const params = useParams();
  const {
    isLoading,
    isError,
    refetch,
    error,
    data: sites,
  } = useQuery({
    queryKey: ["newsletters", params.user],
    queryFn: () => getNewslettersForUser(params.user),
    select: (data) => groupNewslettersBySite(data),
  });

  if (isLoading) {
    return (
      <Container>
        <NewsletterCenter>
          <Loader></Loader>
        </NewsletterCenter>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <NewsletterCenter>
          <NewsletterError>Un test de message d'error {error?.message}</NewsletterError>
          <Button onClick={refetch}>Réessayer</Button>
        </NewsletterCenter>
      </Container>
    );
  }

  return (
    <Container>
      {sites?.map((site) => (
        <section key={site.name}>
          <Heading intent="group">{site.name}</Heading>
          <NewsletterGrid>
            {site.items.map((item) => (
              <Card key={item.id}>
                <NewsletterImage src={item.image} alt={item.title}>
                  <Heading intent="newsletter">{item.title}</Heading>
                </NewsletterImage>
                <p>{item.description}</p>
                <NewsletterButton hasSubscription={item.hasSubscriptionRights} />
              </Card>
            ))}
          </NewsletterGrid>
        </section>
      ))}
    </Container>
  );
}
