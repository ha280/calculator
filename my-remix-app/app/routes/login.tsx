import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { googleLogin } from "../api/auth";
import { useUser } from "~/context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const { user, setUser } = useUser();

  const handleLogin = async () => {
    // Perform server-side authentication here
    // For demonstration purposes, let's assume authentication is successful
    navigate("/calculator");
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
    console.log("google login");
    await googleLogin().then(() => {
      navigate("/calculator");
    });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 w-80 border rounded-lg ">
        <h1 className="text-center text-xl font-semibold">Login</h1>
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
            className="bg-blue-500 text-white p-2 rounded-full w-24"
          >
            Login
          </button>

          <div>
            {!user && <button onClick={handleGoogleLogin}>Google Login</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
