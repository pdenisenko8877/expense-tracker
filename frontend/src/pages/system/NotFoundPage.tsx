import { Link } from 'react-router-dom';
import { Container, Stack, Typography, Button } from '@mui/material';

export const NotFoundPage = () => {
  return (
    <Container maxWidth="xs" sx={{ minHeight: '100%', display: 'flex' }}>
      <Stack spacing={3} alignItems="center" m="auto">
        <Typography variant="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h2" gutterBottom>
          Сторінка не знайдена
        </Typography>
        <Button component={Link} to="/">
          Домашня сторінка
        </Button>
      </Stack>
    </Container>
  );
};
