import { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { googleLogin, loginUser } from "@/features/auth/services/auth.service";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await loginUser(formData.email, formData.password);

      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();

      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.log(error);
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

          <h1 className="text-3xl font-black tracking-tight">Welcome Back</h1>

          <p className="text-muted-foreground">Login to continue shopping</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
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
            {loading ? "Please wait..." : "Login"}
          </Button>
        </form>

        <Button
          variant="outline"
          className="h-12 w-full rounded-xl"
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </Button>

        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-medium text-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
