import { useNavigate } from "@remix-run/react";
import { useUser } from "../context/UserContext";

export default function Calculator() {
  const navigate = useNavigate();
  if (!useUser) {
    navigate("./login");
    return;
  }
}
