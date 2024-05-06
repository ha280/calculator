import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { googleLogin, loginWithEmail } from "../api/auth";
import { useUser } from "~/context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const { user, setUser } = useUser();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await loginWithEmail({ email, password });
      navigate("/calculator");
    } catch (err) {
      setError("Failed to login. Please check your credentials."); // Set error message on failure
    }
  };

  onAuthStateChanged(auth, (result) => {
    if (result) {
      setUser({
        email: result.email ?? "",
        id: result.uid,
        name: result?.displayName ?? "",
      });
    }
  });

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate("/calculator");
    } catch (err) {
      setError("Google login failed.");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 w-80 border rounded-lg ">
        <h1 className="text-center text-xl font-semibold">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}{" "}
        <div className="flex flex-col items-center">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-60 border rounded-full my-2 p-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-60 border rounded-full my-2 p-2"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white p-2 rounded-full w-24 hover:bg-blue-700"
          >
            Login
          </button>

          <div className="flex gap-2 mt-4">
            {!user && (
              <button
                onClick={handleGoogleLogin}
                className="bg-red-500 text-white p-2 rounded-full w-32 hover:bg-red-700"
              >
                Google Login
              </button>
            )}
            {!user && (
              <button
                onClick={() => navigate("/signup")}
                className="bg-green-500 text-white p-2 rounded-full w-32 hover:bg-green-700"
              >
                Sign-up
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
