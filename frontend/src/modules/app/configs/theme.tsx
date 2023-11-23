import { createTheme } from '@mui/material';
import { createBreakpoints } from '@mui/system';

const breakpoints = createBreakpoints({});

const palette = {};

const typography = {
  fontFamily: '"Roboto", sans-serif',
};

export const theme = createTheme({
  palette,
  typography,
  breakpoints,
  components: {},
});
