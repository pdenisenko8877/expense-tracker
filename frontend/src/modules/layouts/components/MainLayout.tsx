import { ReactNode, useCallback } from 'react';
import { Container, Box, AppBar, Button, styled, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAuth } from 'src/modules/auth/hooks/useAuth';
import { ReactComponent as Logo } from 'src/modules/app/image/logo.svg';

const RootBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
});

const RootContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
});

const MainBox = styled(Box)(({ theme }) => ({
  minWidth: 0,
  flexGrow: 1,
  padding: theme.spacing(4, 0),
}));

const Header = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  position: 'sticky',
  top: 0,
  padding: theme.spacing(1.5, 0),
  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
  minHeight: 56,
}));

export interface LightLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: LightLayoutProps) => {
  const { setToken } = useAuth();

  const handleLogout = useCallback(() => setToken(null), [setToken]);

  return (
    <RootBox>
      <Header elevation={0}>
        <Container maxWidth="lg">
          <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
            <Box width={230}>
              <Logo />
            </Box>
            <Button onClick={handleLogout} variant="text" startIcon={<LogoutIcon />}>
              Вийти
            </Button>
          </Stack>
        </Container>
      </Header>

      <RootContainer maxWidth="lg">
        <MainBox component="main">{children}</MainBox>
      </RootContainer>
    </RootBox>
  );
};
