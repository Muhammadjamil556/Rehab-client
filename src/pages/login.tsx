import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useToast } from "../hooks/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if email and password are filled
    if (!email || !password) {
      toast({
        title: "Missing Fields",
        description: "Please fill in both email and password.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // Payload to send in the request
      const payload = {
        email,
        password,
      };

      // API call to login
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/v1/login`,
        payload
      );

      const { accessToken, user } = response.data;

      // Store access token in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    } catch (err: unknown) {
      toast({
        title: "Login Failed",
        description:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-6 text-center">
        <h2 className="text-3xl font-bold text-white">Sign In</h2>
        <p className="text-gray-400">Enter your email & password below</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <Label htmlFor="email" className="sr-only">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-2 bg-black text-white border border-gray-600 rounded-md placeholder-gray-500"
              placeholder="name@example.com"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-2 bg-black text-white border border-gray-600 rounded-md placeholder-gray-500"
              placeholder="Password"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-2 bg-white text-black font-medium rounded-md"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In with Email"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center space-x-2">
          <span className="w-full border-t border-gray-600"></span>
          <span className="text-gray-400 text-[15px] flex">OR</span>
          <span className="w-full border-t border-gray-600"></span>
        </div>

        {/* Google Sign In Button (Example, doesn't work without actual OAuth setup) */}
        <Button className="w-full py-2 bg-black text-white border border-gray-600 hover:bg-gray-700">
          <FaGoogle className="mr-2 h-4 w-4" />
          Sign In with Google
        </Button>

        {/* Terms of Service */}
        <p className="text-xs text-gray-400">
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline hover:text-white">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-white">
            Privacy Policy
          </a>
          .
        </p>

        {/* Link to Signup */}
        <Link to="/signup">
          <p className="text-xs text-red-400">Create Account</p>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
