import { Link as RouterLink } from 'react-router-dom';
import {
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps as MuiBreadcrumbsProps,
  Link,
  Typography,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { BreadcrumbsOption } from '../types';

export interface BreadcrumbsProps extends MuiBreadcrumbsProps {
  readonly options: BreadcrumbsOption[];
}

export const Breadcrumbs = ({ options }: BreadcrumbsProps) => {
  return (
    <MuiBreadcrumbs
      sx={{
        color: 'text.secondary',
        mt: '-10px',
        mb: 3,
        '& .MuiBreadcrumbs-separator': {
          fontSize: 18,
          mx: 0.5,
        },
      }}
      maxItems={6}
      separator={<NavigateNextIcon fontSize="inherit" />}
      component="div">
      {options.map(({ title, to }, index) =>
        to ? (
          <Link
            key={`${title}-${index}`}
            sx={{
              color: 'primary.main',
              '&:hover': {
                color: 'primary.dark',
              },
            }}
            to={to}
            component={RouterLink}
            underline="none">
            {title}
          </Link>
        ) : (
          <Typography key={`${title}-${index}`} color="text.secondary" component="div">
            {title}
          </Typography>
        ),
      )}
    </MuiBreadcrumbs>
  );
};
