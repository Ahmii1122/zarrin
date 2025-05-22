import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  dosigninwithemailandpassword,
  dosigninwithgoogle,
} from "../../firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dosigninwithemailandpassword({
      email: email,
      password: password,
      name: "",
    });
    console.log(result);
    navigate("/");
  };

  const handleGoogleLogin = async () => {
    await dosigninwithgoogle().catch((error) => {
      console.log(error);
    });
    navigate("/");
  };

  return (
    <div className="max-w-contained mx-auto mt-24 items-center justify-center flex flex-col gap-4">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <h2 className="text-4xl font-bold text-center mb-4">Login</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="border border-gray-300 rounded-md px-4 py-2"
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="border border-gray-300 rounded-md px-4 py-2"
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md whitespace-nowrap"
        >
          Login
        </button>
        <button
          type="button"
          className="bg-primary text-white px-4 py-2 rounded-md whitespace-nowrap"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>
        <p>
          Don't have an account?{" "}
          <span
            className="text-primary underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
