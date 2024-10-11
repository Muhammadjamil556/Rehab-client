import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import axios from "axios";
import { useToast } from "../hooks/use-toast";
import { ToastAction } from "../components/ui/toast";
import { Link, useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<
    string | ArrayBuffer | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    const { email, password, confirmPassword } = form;

    // Simple email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email.",
        variant: "destructive",
      });
      return false;
    }

    // Password and confirm password check
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return false;
    }

    // Check password length
    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return false;
    }

    if (!avatar) {
      toast({
        description: "Please upload a picture",
        variant: "destructive",
      });
      return false;
    }

    // Check avatar size (if an avatar is uploaded)
    if (avatar && avatar.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Avatar file size should not exceed 2MB.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("confirmPassword", form.confirmPassword);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/v1/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast({
        description: "Registration Successful",
      });

      navigate("/login"); // Redirect to login page
    } catch (err: unknown) {
      toast({
        title: "Uh oh! Something went wrong.",
        description:
          err.response?.data?.message ||
          "There was a problem with your request.",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);

      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-6 text-center">
        <h2 className="text-3xl font-bold text-white">Create your account</h2>
        <p className="text-gray-400">Fill in the fields below to sign up</p>

        {/* Avatar Upload */}
        <div className="relative">
          <div
            className="w-24 h-24 rounded-full overflow-hidden border border-gray-600 mx-auto cursor-pointer"
            onClick={() => document.getElementById("avatarInput")?.click()}
          >
            <img
              src={
                avatarPreview
                  ? (avatarPreview as string)
                  : "https://github.com/shadcn.png"
              }
              alt="Avatar Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <Input
            id="avatarInput"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="sr-only">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleInputChange}
              className="block w-full p-2 bg-black text-white border border-gray-600 rounded-md placeholder-gray-500"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="sr-only">
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleInputChange}
              className="block w-full p-2 bg-black text-white border border-gray-600 rounded-md placeholder-gray-500"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleInputChange}
              className="block w-full p-2 bg-black text-white border border-gray-600 rounded-md placeholder-gray-500"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleInputChange}
              className="block w-full p-2 bg-black text-white border border-gray-600 rounded-md placeholder-gray-500"
              placeholder="Confirm Password"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-2 bg-white text-black font-medium rounded-md"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-xs text-gray-400 mt-4">
          By clicking sign up, you agree to our{" "}
          <a href="#" className="underline hover:text-white">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-white">
            Privacy Policy
          </a>
          .
        </p>
        <Link to="/login">
          <p className="text-xs text-red-400">Already have an account? Login</p>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
