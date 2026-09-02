import React from "react";
import ThemeRegistry from "./ThemeRegistry";
import ClientProviders from "./ClientProviders";
import ResponsiveAppBar from "@/components/common/responsive-app-bar";


export default function RootLayout({ 
  children 
}: Readonly<{
  children:React.ReactNode;
}>){
  return(
    <html lang="en">
        <body>
          <ThemeRegistry>
            <ClientProviders>
              <ResponsiveAppBar>{children}</ResponsiveAppBar>
            </ClientProviders>
          </ThemeRegistry>
        </body>
    </html>
  )
}
