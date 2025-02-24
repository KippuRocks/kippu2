import React from "react";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { ClientSideLayout } from "@/components";
import theme from "../theme";
import {
  BottomNavigation,
  BottomNavigationAction,
  CssBaseline,
  Paper,
} from "@mui/material";

import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth0 } from "@kippu/auth0";
import { redirect } from "next/navigation";

export default async function WithAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth0.getSession();
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <>
      {/**  style={{ backgroundColor: "#111421" }} */}
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ClientSideLayout accountId={session.user.sub}>
            {children}
            <Paper
              sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
              elevation={3}
            >
              <BottomNavigation showLabels>
                <BottomNavigationAction
                  href="/events"
                  label="Events"
                  icon={<LocalActivityIcon />}
                />
                <BottomNavigationAction
                  href="/auth/logout"
                  label="Logout"
                  icon={<LogoutIcon />}
                />
              </BottomNavigation>
            </Paper>
          </ClientSideLayout>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </>
  );
}
