import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  googleLogin,
  registerUser,
} from "@/features/auth/services/auth.service";
import { toast } from "sonner";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUser(formData.email, formData.password);

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await googleLogin();

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center p-4">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-border/70 bg-card/95 p-5 shadow-xl backdrop-blur sm:p-8">
        <div className="space-y-2 text-center">
          <Link
            to="/"
            className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-xl font-black text-primary-foreground"
          >
            S
          </Link>

          <h1 className="text-3xl font-black tracking-tight">Create Account</h1>

          <p className="text-muted-foreground">Start your ecommerce journey</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="h-12 rounded-xl"
          />

          <Input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="h-12 rounded-xl"
          />

          <Button type="submit" className="h-12 w-full rounded-xl" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <Button
          variant="outline"
          className="h-12 w-full rounded-xl"
          onClick={handleGoogleSignup}
        >
          Continue with Google
        </Button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
