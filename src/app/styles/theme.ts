import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // 모바일 (세로)
      sm: 600, // 모바일 (가로) / 태블릿 (세로)
      md: 960, // 태블릿 (가로) / 작은 데스크톱
      lg: 1280, // 데스크톱
      xl: 1920, // 대형 데스크톱
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
      fontSize: "1.75rem",
      "@media (min-width:600px)": {
        fontSize: "2rem",
      },
      "@media (min-width:960px)": {
        fontSize: "2.5rem",
      },
    },
    h2: {
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: "-0.025em",
      fontSize: "1.5rem",
      "@media (min-width:600px)": {
        fontSize: "1.75rem",
      },
      "@media (min-width:960px)": {
        fontSize: "2rem",
      },
    },
    h3: {
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: "-0.02em",
      fontSize: "1.25rem",
      "@media (min-width:600px)": {
        fontSize: "1.375rem",
      },
      "@media (min-width:960px)": {
        fontSize: "1.5rem",
      },
    },
    h4: {
      fontWeight: 600,
      lineHeight: 1.4,
      fontSize: "1.125rem",
      "@media (min-width:600px)": {
        fontSize: "1.1875rem",
      },
      "@media (min-width:960px)": {
        fontSize: "1.25rem",
      },
    },
    h5: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: "1rem",
      "@media (min-width:600px)": {
        fontSize: "1.0625rem",
      },
      "@media (min-width:960px)": {
        fontSize: "1.125rem",
      },
    },
    h6: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: "0.875rem",
      "@media (min-width:600px)": {
        fontSize: "0.9375rem",
      },
      "@media (min-width:960px)": {
        fontSize: "1rem",
      },
    },

    body1: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
      "@media (min-width:600px)": {
        fontSize: "0.9375rem",
        lineHeight: 1.65,
      },
      "@media (min-width:960px)": {
        fontSize: "1rem",
        lineHeight: 1.7,
      },
    },
    body2: {
      fontSize: "0.75rem",
      lineHeight: 1.5,
      "@media (min-width:600px)": {
        fontSize: "0.8125rem",
        lineHeight: 1.55,
      },
      "@media (min-width:960px)": {
        fontSize: "0.875rem",
        lineHeight: 1.6,
      },
    },
    button: {
      fontSize: "0.75rem",
      fontWeight: 500,
      textTransform: "none",
      "@media (min-width:600px)": {
        fontSize: "0.8125rem",
      },
      "@media (min-width:960px)": {
        fontSize: "0.875rem",
      },
    },
  },

  shape: {
    borderRadius: 8,
  },

  spacing: (factor: number) => `${0.5 * factor}rem`,

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 8,
          boxShadow: "none",
          padding: "6px 12px",
          fontSize: "0.75rem",
          minHeight: "36px",

          "@media (min-width:600px)": {
            padding: "7px 14px",
            fontSize: "0.8125rem",
            minHeight: "38px",
          },

          "@media (min-width:960px)": {
            padding: "8px 16px",
            fontSize: "0.875rem",
            minHeight: "40px",
          },

          "&:hover": {
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
          },
        },
        sizeSmall: {
          padding: "4px 8px",
          fontSize: "0.6875rem",
          minHeight: "28px",
          "@media (min-width:600px)": {
            padding: "5px 10px",
            fontSize: "0.75rem",
            minHeight: "30px",
          },
          "@media (min-width:960px)": {
            padding: "6px 12px",
            fontSize: "0.8125rem",
            minHeight: "32px",
          },
        },
        sizeLarge: {
          padding: "8px 16px",
          fontSize: "0.875rem",
          minHeight: "44px",
          "@media (min-width:600px)": {
            padding: "10px 20px",
            fontSize: "0.9375rem",
            minHeight: "46px",
          },
          "@media (min-width:960px)": {
            padding: "12px 24px",
            fontSize: "1rem",
            minHeight: "48px",
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
            padding: "12px",
            "@media (min-width:600px)": {
              padding: "16px",
            },
            "@media (min-width:960px)": {
              padding: "20px",
            },
            "&:last-child": {
              paddingBottom: "12px",
              "@media (min-width:600px)": {
                paddingBottom: "16px",
              },
              "@media (min-width:960px)": {
                paddingBottom: "20px",
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
            minHeight: "40px",

            "@media (min-width:600px)": {
              borderRadius: 7,
              minHeight: "44px",
            },
            "@media (min-width:960px)": {
              borderRadius: 8,
              minHeight: "48px",
            },

            "& .MuiOutlinedInput-input": {
              padding: "8px 12px",
              "@media (min-width:600px)": {
                padding: "10px 14px",
              },
              "@media (min-width:960px)": {
                padding: "12px 16px",
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
            fontSize: "0.875rem",
            "@media (min-width:600px)": {
              fontSize: "0.9375rem",
            },
            "@media (min-width:960px)": {
              fontSize: "1rem",
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
          height: "24px",
          fontSize: "0.6875rem",

          "@media (min-width:600px)": {
            borderRadius: 5,
            height: "26px",
            fontSize: "0.75rem",
          },
          "@media (min-width:960px)": {
            borderRadius: 6,
            height: "28px",
            fontSize: "0.8125rem",
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
          paddingLeft: "16px",
          paddingRight: "16px",
          "@media (min-width:600px)": {
            paddingLeft: "20px",
            paddingRight: "20px",
          },
          "@media (min-width:960px)": {
            paddingLeft: "24px",
            paddingRight: "24px",
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
          "& .MuiToolbar-root": {
            minHeight: "56px",
            padding: "0 16px",
            "@media (min-width:600px)": {
              minHeight: "60px",
              padding: "0 20px",
            },
            "@media (min-width:960px)": {
              minHeight: "64px",
              padding: "0 24px",
            },
          },
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
          margin: "16px",
          maxWidth: "calc(100% - 32px)",

          "@media (min-width:600px)": {
            borderRadius: 12,
            margin: "32px",
            maxWidth: "calc(100% - 64px)",
          },

          "& .MuiDialogTitle-root": {
            padding: "16px",
            "@media (min-width:600px)": {
              padding: "20px 24px 16px 24px",
            },
          },

          "& .MuiDialogContent-root": {
            padding: "0 16px 16px 16px",
            "@media (min-width:600px)": {
              padding: "0 24px 20px 24px",
            },
          },

          "& .MuiDialogActions-root": {
            padding: "8px 16px 16px 16px",
            "@media (min-width:600px)": {
              padding: "12px 24px 20px 24px",
            },
          },
        },
      },
    },
  },
});

export default theme;
