import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#378ADD',
      dark: '#185FA5',
      light: '#85B7EB',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1D9E75',
      dark: '#0F6E56',
      light: '#5DCAA5',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#E24B4A',
      dark: '#A32D2D',
      light: '#F09595',
    },
    warning: {
      main: '#EF9F27',
      dark: '#854F0B',
      light: '#FAC775',
    },
    success: {
      main: '#639922',
      dark: '#3B6D11',
      light: '#97C459',
    },
    background: {
      default: '#F7F8FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C2C2A',
      secondary: '#5F5E5A',
    },
    divider: 'rgba(44, 44, 42, 0.12)',
  },

  shape: {
    borderRadius: 10,
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: { fontSize: '2rem', fontWeight: 600 },
    h2: { fontSize: '1.6rem', fontWeight: 600 },
    h3: { fontSize: '1.3rem', fontWeight: 600 },
    h4: { fontSize: '1.15rem', fontWeight: 600 },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      marginBottom: '1.25rem',
      textAlign: 'center',
      '@media (max-width:600px)': {
        fontSize: '1.05rem',
        marginBottom: '1rem',
      },
    },
    h6: {
      fontSize: '1.05rem',
      fontWeight: 600,
      marginBottom: '0.75rem',
    },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '0.9rem', lineHeight: 1.6 },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },

  components: {
    // ---------- Card ----------
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: 480,
          margin: '16px auto',
          padding: '24px',
          borderRadius: 12,
          border: '1px solid rgba(44, 44, 42, 0.08)',
          boxShadow: '0px 4px 20px rgba(0,0,0,0.06)',
          [theme.breakpoints.down('sm')]: {
            padding: '16px',
            margin: '8px auto',
            borderRadius: 8,
            maxWidth: '100%',
          },
        }),
      },
    },

    // ---------- Paper (Table, Modal...) ----------
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: '0px 2px 12px rgba(0,0,0,0.05)',
        },
      },
    },

    // ---------- Button ----------
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 8,
          paddingTop: 10,
          paddingBottom: 10,
          marginTop: 8,
          marginBottom: 8,
          [theme.breakpoints.down('sm')]: {
            width: '100%',
          },
        }),
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },

    // ---------- TextField ----------
    MuiTextField: {
      styleOverrides: {
        root: {
          marginTop: 8,
          marginBottom: 8,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },

    // ---------- AppBar / Navbar ----------
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 8px rgba(0,0,0,0.08)',
        },
      },
    },

    // ---------- Alert ----------
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginBottom: 16,
        },
      },
    },

    // ---------- Table ----------
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: '#F7F8FA',
        },
        root: ({ theme }) => ({
          [theme.breakpoints.down('sm')]: {
            padding: '8px',
            fontSize: '0.8rem',
          },
        }),
      },
    },

    // ---------- Chip ----------
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
  },
})