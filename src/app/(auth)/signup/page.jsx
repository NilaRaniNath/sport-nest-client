"use client"
import { authClient } from '@/lib/auth-client';
import { Check } from '@gravity-ui/icons';
import { Button, Card, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import React, { useState } from 'react';
import { GrGoogle } from 'react-icons/gr';
import { toast } from 'react-toastify';

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signUp.email({
        email: user.email?.trim(),
        password: user.password,
        name: user.name?.trim(),
        image: user.image?.trim()
      });

      if (data) {
        toast.success("🎉 Registration Successful!", {
          position: "top-right",
          autoClose: 3000,
        });
        router.push("/signin");
      }
      
      if (error) {
        
        if (error.status === 422) {
          toast.error("This email is already registered!");
        } else {
          toast.error(error.message || "Registration failed!");
        }
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      
      toast.info("Redirecting to Google...");
    } catch (err) {
      toast.error("Google SignUp failed!");
    }
  };

  return (
    
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      
      <Card className='w-full max-w-md p-8 bg-white/80 backdrop-blur-md shadow-xl border border-slate-200 rounded-3xl transition-all duration-300 hover:shadow-2xl'>
        
    
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-extrabold text-blue-950 tracking-tight'>
            Sport<span className='text-blue-600'>Nest</span>
          </h2>
          <p className='mt-2 text-sm text-slate-500 font-medium'>
            Create an account to join the ultimate sports hub
          </p>
        </div>

       
        <Form 
          onSubmit={onSubmit} 
          className="flex flex-col gap-5 w-full"
          render={(props) => <form {...props} data-custom="foo" />}
        >
          
          <TextField
            isRequired
            name="name"
            type="text"
            className="w-full"
          >
            <Label className="text-slate-700 font-semibold text-sm mb-1">Full Name</Label>
            <Input 
              name='name' 
              placeholder="Enter Your Name" 
              className="bg-slate-50/50 hover:bg-slate-100/70 transition-colors"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          {/* Email Input */}
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

          {/* Profile Image URL Input */}
          <TextField
            name="image"
            type="url"
          >
            <Label className="text-slate-700 font-semibold text-sm mb-1">Profile Image URL</Label>
            <Input 
              name='image' 
              placeholder="https://example.com/photo.jpg" 
              className="bg-slate-50/50 hover:bg-slate-100/70 transition-colors"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          {/* Password Input */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) return "Password must be at least 8 characters";
              if (!/[A-Z]/.test(value)) return "Must contain at least one uppercase letter";
              if (!/[0-9]/.test(value)) return "Must contain at least one number";
              return null;
            }}
          >
            <Label className="text-slate-700 font-semibold text-sm mb-1">Password</Label>
            <Input 
              name='password' 
              type="password"
              placeholder="••••••••" 
              className="bg-slate-50/50 hover:bg-slate-100/70 transition-colors"
            />
            <Description className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          {/* Submit Button */}
          <div className="mt-2">
            <Button 
              className='w-full bg-blue-950 hover:bg-blue-900 text-white font-bold py-6 rounded-2xl shadow-lg shadow-blue-950/20 transition-all duration-200 active:scale-[0.98]'
              type="submit"
              isLoading={loading}
            >
              {!loading && <Check className="w-5 h-5 mr-2" />}
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </div>

         
          <div className='text-center mt-2'>
            <p className='text-xs text-slate-500'>
              Already have an account?{' '}
              <Link href="/signin" className='text-blue-600 font-bold hover:underline transition-all'>
                Log In
              </Link>
            </p>
          </div>

              <div className="flex flex-col items-center gap-4 mt-8 w-full">
          <div className="flex items-center w-full gap-2 text-gray-400">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs font-medium">OR</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          <Button
            onPress={handleGoogleSignUp}
            variant="ghost"
            className="animate__animated animate__fadeInUp animate__delay-1s w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 transition-all font-medium py-5"
          >
            <GrGoogle className="text-xl text-red-500" />
            Register with Google
          </Button>
        </div>


        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;