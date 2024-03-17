import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import {supabase} from "../../supabaseClient";
import {useSearchParams} from "react-router-dom";
import {Auth} from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import ErrorAlert from "../../components/error-alert";
const publicSiteUrl = import.meta.env.VITE_PUBLIC_SITE_URL


import "./styles.css";

export default function LoginView() {
  const theme = useTheme();
  const [searchParams] = useSearchParams();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <div style={{display: "flex"}}>
            <Logo sx={{mr: 2}} />
            <Typography variant="h4">Sign in to glowlist</Typography>
          </div>

          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["google"]}
            showLinks={false}
            redirectTo={publicSiteUrl}
          />
          {searchParams.has("error_description") && (
            <ErrorAlert text={searchParams.get("error_description")} />
          )}

        </Card>
      </Stack>
    </Box>
  );
}
