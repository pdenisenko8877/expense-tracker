import { ReactNode } from 'react';
import { Container, Box, styled } from '@mui/material';

import { ReactComponent as Logo } from 'src/modules/app/image/logo.svg';

const RootBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
});

const RootContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  padding: theme.spacing(4),
}));

const MainBox = styled(Box)({
  margin: 'auto',
  width: '100%',
  maxWidth: 400,
});

export interface LightLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: LightLayoutProps) => {
  return (
    <RootBox>
      <RootContainer maxWidth="sm">
        <MainBox component="main">
          <Box mb={3}>
            <Logo />
          </Box>
          {children}
        </MainBox>
      </RootContainer>
    </RootBox>
  );
};
