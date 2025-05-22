import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { docreateUserWithEmailAndPassword } from "../../firebase/auth";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      await docreateUserWithEmailAndPassword({ name, email, password });
      setLoading(false);
      navigate("/login");
    } catch (error: any) {
      setLoading(false);
      alert(error.message || "Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="max-w-contained mx-auto mt-24 items-center justify-center flex flex-col gap-4  ">
      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <h2 className="text-4xl font-bold text-center mb-4">Sign Up</h2>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="Firstname">First Name</label>
            <input
              className=" bg-gray-100  rounded-md px-4 py-2"
              type="text"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="Lastname">Last Name</label>
            <input
              className=" bg-gray-100  rounded-md px-4 py-2"
              type="text"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            className=" bg-gray-100  rounded-md px-4 py-2"
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
            className=" bg-gray-100  rounded-md px-4 py-2"
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className=" bg-gray-100  rounded-md px-4 py-2"
            type="password"
            placeholder=""
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md whitespace-nowrap"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <p>
          Already have an account?{" "}
          <span
            className="text-primary underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
