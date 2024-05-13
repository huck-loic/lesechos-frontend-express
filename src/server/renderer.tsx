import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import express from "express";
import path from "path";
import App from "../client/App";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { ServerStyleSheet } from "styled-components";
import serialize from "serialize-javascript";
import { getNewslettersForUser } from "../shared/services/get-newsletters-for-user";
import { dehydrate, HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

export default async (req: express.Request) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["newsletters", req.params.user],
    queryFn: () => getNewslettersForUser(req.params.user),
  });
  const dehydratedState = dehydrate(queryClient);

  const sheet = new ServerStyleSheet();
  const loadableJson = path.resolve(__dirname, "./loadable-stats.json");

  const extractor = new ChunkExtractor({
    statsFile: loadableJson,
    entrypoints: ["client"],
  });

  const content = renderToString(
    sheet.collectStyles(
      <ChunkExtractorManager extractor={extractor}>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <StaticRouter location={req.path}>
              <App />
            </StaticRouter>
          </HydrationBoundary>
        </QueryClientProvider>
      </ChunkExtractorManager>
    )
  );

  const helmet = Helmet.renderStatic();

  return `
    <!DOCTYPE html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        <script>window.__REACT_QUERY_STATE__ = ${serialize(dehydratedState)}</script>
        ${sheet.getStyleTags()}
        ${extractor.getStyleTags()}
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${content}</div>
      </body>
      ${extractor.getScriptTags()}
    </html>
  `;
};
