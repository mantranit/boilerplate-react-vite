import Box, { BoxProps } from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { MouseEventHandler } from 'react';

import { GithubIcon, GoogleIcon, TwitterIcon } from 'src/assets/icons';

// ----------------------------------------------------------------------
export type TFormSocialsProps = BoxProps & {
  signInWithGoogle?: MouseEventHandler<HTMLButtonElement>;
  singInWithGithub?: MouseEventHandler<HTMLButtonElement>;
  signInWithTwitter?: MouseEventHandler<HTMLButtonElement>;
};

export function FormSocials({
  sx,
  signInWithGoogle,
  singInWithGithub,
  signInWithTwitter,
  ...other
}: TFormSocialsProps) {
  return (
    <Box gap={1.5} display="flex" justifyContent="center" sx={sx} {...other}>
      <IconButton color="inherit" onClick={signInWithGoogle}>
        <GoogleIcon width={22} />
      </IconButton>
      <IconButton color="inherit" onClick={singInWithGithub}>
        <GithubIcon width={22} />
      </IconButton>
      <IconButton color="inherit" onClick={signInWithTwitter}>
        <TwitterIcon width={22} />
      </IconButton>
    </Box>
  );
}
