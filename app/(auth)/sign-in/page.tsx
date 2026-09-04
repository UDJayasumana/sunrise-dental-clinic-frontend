
"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { BackendSignInError, SignInFormValues } from '@/types/auth.types';

import { 
    Box, 
    Button, 
    FormControl, 
    FormLabel, 
    Link, 
    TextField, 
    Typography 
} from '@mui/material';
import apiServer from '@/lib/api/client/api-server';
import { AUTH_ENDPOINTS } from '@/lib/endpoints';
import { SitemarkIcon } from '@/components/icons/custom-Icons';
import { Card } from "@/components/common/card";


const SignInPage = () => {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
      } = useForm<SignInFormValues>();

      const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
        try {
          const res = await apiServer.post(AUTH_ENDPOINTS.auth.signin, data);
        } catch (err: any) {
          const error: BackendSignInError = err.response?.data;
    
          if (error?.errors) {
            Object.keys(error.errors).forEach((key) => {
              const field = key as keyof SignInFormValues;
              setError(field, { type: "server", message: error.errors![field] });
            });
          }
        }
      };
      
  return (
    <Card variant="outlined">
        <SitemarkIcon />
        <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            {...register("email")}
            autoComplete="email"
            id="email"
            placeholder="your@email.com"
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            {...register("password")}
            autoComplete="new-password"
            id="password"
            placeholder="••••••"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <Button type="submit" fullWidth variant="contained">
          Sign in
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Don't have an account?{" "}
          <Link href="/sign-up" variant="body2" sx={{ alignSelf: "center" }}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </Card>
  )
}

export default SignInPage