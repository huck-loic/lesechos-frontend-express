import React from "react";
import App from "./App";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { loadableReady } from "@loadable/component";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";

declare global {
  interface Window {
    __REACT_QUERY_STATE__: unknown;
  }
}

function renderApp() {
  const rootContent = document.getElementById("root");
  if (!rootContent) {
    throw new Error("[renderApp] Unable to find #root in dom");
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  hydrateRoot(
    rootContent,
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={window.__REACT_QUERY_STATE__}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

loadableReady(renderApp);
