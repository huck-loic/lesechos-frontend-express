import React from "react";
import NewsletterHeader from "../components/organisms/NewsletterHeader";
import NewslettersList from "../components/organisms/NewsletterList";
import { Helmet } from "react-helmet";
import SiteHeader from "../components/organisms/SiteHeader";
import { useParams } from "react-router-dom";

const title = "Newsletters";
const description =
  "Dans cette page, vous retrouvez l’ensemble des newsletters des Echos et des marques satellites. Ainsi, vous pouvez découvrir toutes nos newsletters selon vos centres d’intérêt et gérer plus facilement l’inscription à vos newsletters.";

export default function UserPage() {
  const params = useParams();

  return (
    <>
      <Helmet>
        <title>
          {title} | {params.user ?? "base"}
        </title>
        <meta name="description" content={description} />
      </Helmet>
      <SiteHeader />
      <NewsletterHeader title={title} description={description} />
      <NewslettersList />
    </>
  );
}
