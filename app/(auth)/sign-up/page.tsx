"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { BackendSignUpError, SignUpFormValues } from '@/types/auth.types';
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Link, 
  TextField, 
  Typography } from '@mui/material';
import apiServer from '@/lib/api/client/api-server';
import { AUTH_ENDPOINTS } from '@/lib/endpoints';
import { SunriseIcon } from '@/components/icons/custom-Icons';
import { Card } from "@/components/common/card";
import { useRouter } from 'next/navigation';






const SignupPage = () => {

    const route = useRouter();

    const{
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<SignUpFormValues>();

    const onSubmit: SubmitHandler<SignUpFormValues> = async (data) =>{
        try{
          const res = await apiServer.post(AUTH_ENDPOINTS.auth.signup, data);

          if(res){
            setTimeout(()=>{
              route.push('/sign-in');
            }, 1000);
          }

        }catch(err: any){
          const error: BackendSignUpError = err.response?.data;

          if (error?.errors) {
            Object.keys(error.errors).forEach((key) => {
              const field = key as keyof SignUpFormValues;
              setError(field, { type: "server", message: error.errors![field] });
            });
          }
        }
    }

  return (
    <Card variant="outlined">
      <SunriseIcon />
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
         <FormControl>
          <FormLabel htmlFor="name">Full name</FormLabel>
          <TextField
            {...register("name")}
            autoComplete="name"
            id="name"
            placeholder="Your Name"
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />
        </FormControl>
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
          Sign up
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link
                href="/sign-in"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign in
              </Link>
            </Typography>
      </Box>
    </Card>
  )
}

export default SignupPage