import { useState, useCallback } from 'react';
import { InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffOutlined';

import { TextProps, Text } from './Text';

export const Password = ({ InputProps, ...props }: TextProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = useCallback(() => setShowPassword(!showPassword), [showPassword]);

  return (
    <Text
      {...props}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={handleClickShowPassword}
              color="inherit">
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
