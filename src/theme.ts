
import { createContext, useState, useMemo, useEffect} from "react";
import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import type { PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          myColor: {
            main: "#f6f9fc"
          },
          bg: {
            main: "#f6f6f6"
          },
          text: {
            primary: "#2B3445",
          },
          neutral: {
            main: "#64748B",
          },

          favColor: {
            main: grey[300],
          },
        }
      : {
          // palette values for dark mode
          myColor: {
            main: "#252b32"
          },
          bg: {
            main: "#1D2021"
          },
          neutral: {
            main: "#64748B",
          },

          favColor: {
            main: grey[800],
          },
          text: {
            primary: "#fff",
          },
        }),
  },
});

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState<PaletteMode>(
    (localStorage.getItem("mode") as PaletteMode) || "light"
    
  );
    useEffect(() => {
  localStorage.setItem("mode", mode);
}, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return [theme, colorMode] as const;
};

declare module '@mui/material/styles' {
  interface Palette {
    myColor: {
      main: string;
    };
    bg: {
      main: string
    }
  }
  interface PaletteOptions {
    myColor?: {
      main?: string;
    };
    bg: {
      main: string;
    }
  }
}