import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },

  palette: {
    mode: "light",
    primary: {
      main: "#2563eb",
      light: "#60a5fa",
      dark: "#1e40af",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#475569",
      light: "#94a3b8",
      dark: "#1e293b",
      contrastText: "#ffffff",
    },
    success: {
      main: "#16a34a",
      light: "#4ade80",
      dark: "#166534",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#eab308",
      light: "#facc15",
      dark: "#a16207",
      contrastText: "#0f172a",
    },
    error: {
      main: "#dc2626",
      light: "#f87171",
      dark: "#991b1b",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569",
    },
    divider: "#e2e8f0",
  },

  typography: {
    fontFamily:
      "Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",

    h1: {
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.025em",
      fontSize: "2.8rem",
      "@media (min-width:600px)": {
        fontSize: "3.2rem",
      },
      "@media (min-width:960px)": {
        fontSize: "4rem",
      },
    },
    h2: {
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: "-0.025em",
      fontSize: "2.4rem",
      "@media (min-width:600px)": {
        fontSize: "2.8rem",
      },
      "@media (min-width:960px)": {
        fontSize: "3.2rem",
      },
    },
    h3: {
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: "-0.02em",
      fontSize: "2rem",
      "@media (min-width:600px)": {
        fontSize: "2.2rem",
      },
      "@media (min-width:960px)": {
        fontSize: "2.4rem",
      },
    },
    h4: {
      fontWeight: 600,
      lineHeight: 1.4,
      fontSize: "1.8rem",
      "@media (min-width:600px)": {
        fontSize: "1.9rem",
      },
      "@media (min-width:960px)": {
        fontSize: "2rem",
      },
    },
    h5: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: "1.6rem",
      "@media (min-width:600px)": {
        fontSize: "1.7rem",
      },
      "@media (min-width:960px)": {
        fontSize: "1.8rem",
      },
    },
    h6: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: "1.4rem",
      "@media (min-width:600px)": {
        fontSize: "1.5rem",
      },
      "@media (min-width:960px)": {
        fontSize: "1.6rem",
      },
    },

    body1: {
      fontSize: "1.4rem",
      lineHeight: 1.6,
      "@media (min-width:600px)": {
        fontSize: "1.5rem",
        lineHeight: 1.65,
      },
      "@media (min-width:960px)": {
        fontSize: "1.6rem",
        lineHeight: 1.7,
      },
    },
    body2: {
      fontSize: "1.2rem",
      lineHeight: 1.5,
      "@media (min-width:600px)": {
        fontSize: "1.3rem",
        lineHeight: 1.55,
      },
      "@media (min-width:960px)": {
        fontSize: "1.4rem",
        lineHeight: 1.6,
      },
    },
    button: {
      fontSize: "1.2rem",
      fontWeight: 500,
      textTransform: "none",
      "@media (min-width:600px)": {
        fontSize: "1.3rem",
      },
      "@media (min-width:960px)": {
        fontSize: "1.4rem",
      },
    },
  },

  shape: {
    borderRadius: 8,
  },

  spacing: (factor: number) => `${factor}rem`,

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 8,
          boxShadow: "none",
          padding: "0.6rem 1.2rem",
          fontSize: "1.2rem",
          minHeight: "3.6rem",

          "@media (min-width:600px)": {
            padding: "0.7rem 1.4rem",
            fontSize: "1.3rem",
            minHeight: "3.8rem",
          },

          "@media (min-width:960px)": {
            padding: "0.8rem 1.6rem",
            fontSize: "1.4rem",
            minHeight: "4rem",
          },

          "&:hover": {
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
          },
        },
        sizeSmall: {
          padding: "0.4rem 0.8rem",
          fontSize: "1.1rem",
          minHeight: "2.8rem",
          "@media (min-width:600px)": {
            padding: "0.5rem 1rem",
            fontSize: "1.2rem",
            minHeight: "3rem",
          },
          "@media (min-width:960px)": {
            padding: "0.6rem 1.2rem",
            fontSize: "1.3rem",
            minHeight: "3.2rem",
          },
        },
        sizeLarge: {
          padding: "0.8rem 1.6rem",
          fontSize: "1.4rem",
          minHeight: "4.4rem",
          "@media (min-width:600px)": {
            padding: "1rem 2rem",
            fontSize: "1.5rem",
            minHeight: "4.6rem",
          },
          "@media (min-width:960px)": {
            padding: "1.2rem 2.4rem",
            fontSize: "1.6rem",
            minHeight: "4.8rem",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
          "& .MuiCardContent-root": {
            padding: "1.2rem",
            "@media (min-width:600px)": {
              padding: "1.6rem",
            },
            "@media (min-width:960px)": {
              padding: "2rem",
            },
            "&:last-child": {
              paddingBottom: "1.2rem",
              "@media (min-width:600px)": {
                paddingBottom: "1.6rem",
              },
              "@media (min-width:960px)": {
                paddingBottom: "2rem",
              },
            },
          },

          "@media (min-width:600px)": {
            borderRadius: 10,
          },
          "@media (min-width:960px)": {
            borderRadius: 12,
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 6,
            backgroundColor: "#ffffff",
            minHeight: "4rem",

            "@media (min-width:600px)": {
              borderRadius: 7,
              minHeight: "4.4rem",
            },
            "@media (min-width:960px)": {
              borderRadius: 8,
              minHeight: "4.8rem",
            },

            "& .MuiOutlinedInput-input": {
              padding: "0.8rem 1.2rem",
              "@media (min-width:600px)": {
                padding: "1rem 1.4rem",
              },
              "@media (min-width:960px)": {
                padding: "1.2rem 1.6rem",
              },
            },

            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#60a5fa",
              },
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2563eb",
                borderWidth: "2px",
              },
            },
          },

          "& .MuiInputLabel-root": {
            fontSize: "1.4rem",
            "@media (min-width:600px)": {
              fontSize: "1.5rem",
            },
            "@media (min-width:960px)": {
              fontSize: "1.6rem",
            },
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 500,
          height: "2.4rem",
          fontSize: "1.1rem",

          "@media (min-width:600px)": {
            borderRadius: 5,
            height: "2.6rem",
            fontSize: "1.2rem",
          },
          "@media (min-width:960px)": {
            borderRadius: 6,
            height: "2.8rem",
            fontSize: "1.3rem",
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "@media (min-width:600px)": {
            borderRadius: 10,
          },
          "@media (min-width:960px)": {
            borderRadius: 12,
          },
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "1.6rem",
          paddingRight: "1.6rem",
          "@media (min-width:600px)": {
            paddingLeft: "2rem",
            paddingRight: "2rem",
          },
          "@media (min-width:960px)": {
            paddingLeft: "2.4rem",
            paddingRight: "2.4rem",
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
          borderRadius: 0,
          "@media (min-width:600px)": {
            borderRadius: 0,
          },
          "@media (min-width:960px)": {
            borderRadius: 0,
          },
          "& .MuiToolbar-root": {
            minHeight: "5.6rem",
            padding: "0 1.6rem",
            borderRadius: 0,
            "@media (min-width:600px)": {
              minHeight: "6rem",
              padding: "0 2rem",
              borderRadius: 0,
            },
            "@media (min-width:960px)": {
              minHeight: "6.4rem",
              padding: "0 2.4rem",
              borderRadius: 0,
            },
          },
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
          margin: "1.6rem",
          maxWidth: "calc(100% - 3.2rem)",

          "@media (min-width:600px)": {
            borderRadius: 12,
            margin: "3.2rem",
            maxWidth: "calc(100% - 6.4rem)",
          },

          "& .MuiDialogTitle-root": {
            padding: "1.6rem",
            "@media (min-width:600px)": {
              padding: "2rem 2.4rem 1.6rem 2.4rem",
            },
          },

          "& .MuiDialogContent-root": {
            padding: "0 1.6rem 1.6rem 1.6rem",
            "@media (min-width:600px)": {
              padding: "0 2.4rem 2rem 2.4rem",
            },
          },

          "& .MuiDialogActions-root": {
            padding: "0.8rem 1.6rem 1.6rem 1.6rem",
            "@media (min-width:600px)": {
              padding: "1.2rem 2.4rem 2rem 2.4rem",
            },
          },
        },
      },
    },
  },
});

export default theme;
