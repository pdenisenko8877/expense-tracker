import { createTheme } from '@mui/material';
import { createBreakpoints } from '@mui/system';

const breakpoints = createBreakpoints({});

const palette = {
  primary: {
    main: '#015668',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#0ab3ba',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#EB5757',
  },
  success: {
    main: '#27AE60',
  },
  info: {
    main: '#0A84DD',
  },
  warning: {
    main: '#EAB600',
  },
  grey: {
    200: '#F0F1F2',
    300: '#C3C9D2',
  },
  text: {
    primary: '#012c35',
  },
};

const fontFamily = '"Roboto", sans-serif';

export const theme = createTheme({
  palette,
  typography: {
    fontFamily,
    fontSize: 14,
    fontWeightBold: 600,

    h1: {
      fontSize: 28,
      fontWeight: 600,
      lineHeight: 1.4,

      [breakpoints.up('sm')]: {
        fontSize: 32,
      },
    },
    h2: {
      fontSize: 20,
      fontWeight: 600,

      [breakpoints.up('sm')]: {
        fontSize: 24,
      },
    },
    h3: {
      fontSize: 18,
      fontWeight: 600,

      [breakpoints.up('sm')]: {
        fontSize: 20,
      },
    },
    h4: {
      fontSize: 16,
      fontWeight: 600,
    },
    h5: {
      fontSize: 14,
      fontWeight: 600,
    },
    body1: {
      fontSize: 14,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: 16,
      lineHeight: 1.4,
    },
    button: {
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.4,
      textTransform: 'none',
    },
  },
  breakpoints,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
          WebkitTextSizeAdjust: '100%',
        },
        body: {
          backgroundColor: palette.grey[200],
          '&, & > #root': {
            height: '100%',
          },
          '& .Toastify__toast': {
            padding: 0,
            minHeight: 0,
            borderRadius: 8,

            '&-body': {
              padding: 0,
              margin: 0,
            },
            '& .Toastify__close-button': {
              position: 'absolute',
              top: 5,
              right: 5,
            },
          },
        },
      },
    },
    MuiButton: {
      defaultProps: { variant: 'contained', color: 'primary' },
      styleOverrides: {
        root: {
          boxShadow: 'none !important',
          fontWeight: 400,
          minWidth: 110,
        },
        contained: {
          padding: '8px 20px',
        },
      },
    },
  },
});
