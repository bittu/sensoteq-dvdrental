import React, { useMemo } from "react";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getDesignTokens, getThemedComponents } from './M3Theme';
import { deepmerge } from "@mui/utils";
// import { ThemeModeContext } from '../context/ThemeModeContext';
// import { ThemeSchemeContext } from '../context/ThemeSchemeContext';
import { CssBaseline } from "@mui/material";

const M3ThemeProvider = ({ children }) => {

    // const { themeMode } = useContext(ThemeModeContext);
    // const { themeScheme } = useContext(ThemeSchemeContext);

    const m3Theme = useMemo(() => {
        const designTokens = getDesignTokens("dark");
        let newM3Theme = createTheme(designTokens);
        newM3Theme = deepmerge(newM3Theme, getThemedComponents(newM3Theme));

        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#1C1B1F');

        return newM3Theme;
    }, []);

    return (
        <ThemeProvider theme={m3Theme}>
            <CssBaseline enableColorScheme />
            {children}.
        </ThemeProvider>
    );
}

export default M3ThemeProvider;