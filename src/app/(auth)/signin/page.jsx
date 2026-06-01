"use client"

import { authClient } from '@/lib/auth-client';
import { Check } from '@gravity-ui/icons';
import { Button, Card, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { GrGoogle } from 'react-icons/gr';
import { toast } from 'react-toastify';

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        email: user.email?.trim(),
        password: user.password,
        callbackURL: "/" 
      });

      
      if (data) {
        toast.success("👋 Welcome back! Login Successful.", {
          position: "top-right",
          autoClose: 2000,
        });
        router.push("/");
      }

      if (error) {
        
        if (error.status === 401 || error.code === "INVALID_EMAIL_OR_PASSWORD") {
          toast.error("Invalid email or password!");
        } else {
          toast.error(error.message || "Login failed! Please try again.");
        }
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/'
      });
      toast.info("Signing in with Google...");
    } catch (err) {
      toast.error("Google Sign-In failed!");
    };
  };

  return (
    
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      
      <Card className='w-full max-w-md p-8 bg-white/80 backdrop-blur-md shadow-xl border border-slate-200 rounded-3xl transition-all duration-300 hover:shadow-2xl'>
        
        
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-extrabold text-blue-950 tracking-tight'>
            Sport<span className='text-blue-600'>Nest</span>
          </h2>
          <p className='mt-2 text-sm text-slate-500 font-medium'>
            Welcome back! Please enter your details
          </p>
        </div>

        
        <Form 
          onSubmit={onSubmit} 
          className="flex flex-col gap-5 w-full"
          render={(props) => <form {...props} data-custom="foo" />}
        >
      
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-slate-700 font-semibold text-sm mb-1">Email Address</Label>
            <Input 
              name='email' 
              placeholder="you@example.com" 
              className="bg-slate-50/50 hover:bg-slate-100/70 transition-colors"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          
          <TextField
            isRequired
            name="password"
            type="password"
          >
            <div className="flex justify-between items-center mb-1">
              <Label className="text-slate-700 font-semibold text-sm">Password</Label>
              <a href="/forgot-password" className="text-xs font-bold text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <Input 
              name='password' 
              type="password"
              placeholder="••••••••" 
              className="bg-slate-50/50 hover:bg-slate-100/70 transition-colors"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

        
          <div className="mt-2">
            <Button 
              className='w-full bg-blue-950 hover:bg-blue-900 text-white font-bold py-6 rounded-2xl shadow-lg shadow-blue-950/20 transition-all duration-200 active:scale-[0.98]'
              type="submit"
              isLoading={loading}
            >
              {!loading && <Check className="w-5 h-5 mr-2" />}
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </div>

          
          <div className='text-center mt-2'>
            <p className='text-xs text-slate-500'>
              Do not have an account?{' '}
              <a href="/signup" className='text-blue-600 font-bold hover:underline transition-all'>
                Sign Up
              </a>
            </p>
          </div>


                   <div className="flex flex-col items-center gap-4 mt-8 w-full">
          <div className="flex items-center w-full gap-2 text-gray-400">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs font-medium">OR</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          <Button
            onPress={handleGoogleSignIn}
            variant="ghost"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 transition-all font-medium py-5"
          >
            <GrGoogle className="text-xl text-red-500" />
            Sign In with Google
          </Button>
        </div>




        </Form>
      </Card>
    </div>
  );
};

export default SignInPage;