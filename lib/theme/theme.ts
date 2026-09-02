import { createTheme } from "@mui/material/styles";
import { colorSchemes, typography, shadows, shape } from "./theme-primitives";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  cssVariables: {
    colorSchemeSelector: "data-mui-color-scheme",
    cssVarPrefix: "template",
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          "&.Mui-error": {
            color: "red", // custom error color for all fields
          },
        },
      },
    },
  },
  colorSchemes,
  typography,
  shadows,
  shape,
});

export default theme;
