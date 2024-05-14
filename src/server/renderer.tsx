import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { ServerStyleSheet } from "styled-components";
import { getNewslettersForUser } from "../shared/services/get-newsletters-for-user";
import { dehydrate, HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import express from "express";
import path from "path";
import serialize from "serialize-javascript";
import App from "../client/App";

export default async (req: express.Request) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["newsletters", req.params.user],
    queryFn: () => getNewslettersForUser(req.params.user),
  });
  const dehydratedState = dehydrate(queryClient);

  const sheet = new ServerStyleSheet();

  const loadableJson = require("/dist/loadable-stats.json");

  const extractor = new ChunkExtractor({
    stats: loadableJson,
    entrypoints: ["client"],
  });

  const content = renderToString(
    extractor.collectChunks(
      sheet.collectStyles(
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <StaticRouter location={req.path}>
              <App />
            </StaticRouter>
          </HydrationBoundary>
        </QueryClientProvider>
      )
    )
  );

  const helmet = Helmet.renderStatic();

  return `
    <!DOCTYPE html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        ${sheet.getStyleTags()}
        ${extractor.getStyleTags()}
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <script>window.__REACT_QUERY_STATE__ = ${serialize(dehydratedState)}</script>
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${content}</div>
      </body>
      ${extractor.getScriptTags()}
    </html>
  `;
};
