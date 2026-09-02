"use client";

import React from 'react'
import ClientOnly from './ClientOnly'
import { ThemeProvider } from "@mui/material/styles";
import theme from '@/lib/theme/theme';
import { CssBaseline } from '@mui/material';
import { BackgroundContainer } from '@/components/common/background-container';



export default function ClientProviders({
    children
}:{
    children: React.ReactNode
}){
    return(
        <ClientOnly>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme/>
                <BackgroundContainer>
                    {children}
                </BackgroundContainer>
            </ThemeProvider>
        </ClientOnly>
     )
}