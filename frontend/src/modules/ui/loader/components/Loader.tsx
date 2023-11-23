import { forwardRef } from 'react';
import { Backdrop, BackdropProps, CircularProgress } from '@mui/material';

export interface LoaderProps extends Omit<BackdropProps, 'open'> {
  readonly isLoading: boolean;
  readonly size?: number;
  readonly position?: 'static' | 'absolute' | 'fixed';
  readonly color?: string;
}

export const Loader = forwardRef<HTMLDivElement, LoaderProps>(
  (
    { isLoading, children, size = 50, sx, invisible, position = 'fixed', color = 'primary.main' },
    ref,
  ) => {
    return (
      <>
        {isLoading && (
          <Backdrop
            open={isLoading}
            sx={{
              position,
              zIndex: theme => theme.zIndex.drawer + 1,
              ...sx,
            }}
            invisible={invisible}
            ref={ref}>
            <CircularProgress size={size} sx={{ color }} />
          </Backdrop>
        )}
        {!isLoading && children}
      </>
    );
  },
);
