import React from "react";
import { SiteHeaderLink, SiteHeaderWrapper } from "./SiteHeaderWrapper";

export default function SiteHeader() {
  return (
    <SiteHeaderWrapper>
      <SiteHeaderLink to="/">Base</SiteHeaderLink>
      <SiteHeaderLink to="/one">One</SiteHeaderLink>
      <SiteHeaderLink to="/multiple">Multiple</SiteHeaderLink>
    </SiteHeaderWrapper>
  );
}
