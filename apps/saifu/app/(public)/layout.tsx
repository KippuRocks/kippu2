import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { ClientSideLayout } from "@/components";
import theme from "../theme";
import { CssBaseline } from "@mui/material";
import { auth0 } from "@kippu/auth0";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accountId = (await auth0.getSession())?.user.sub;

  return (
    <>
      {/**  style={{ backgroundColor: "#111421" }} */}
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ClientSideLayout accountId={accountId}>{children}</ClientSideLayout>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </>
  );
}
