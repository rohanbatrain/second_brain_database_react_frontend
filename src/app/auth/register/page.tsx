"use client"; // Required for client-side interactivity
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Adjust based on your routing library
import logoLight from "../../assets/logo_light_tp.png"; // Adjust the path to your light mode logo image
import logoDark from "../../assets/logo_dark_tp.png"; // Adjust the path to your dark mode logo image
import Settings from "../components/settings"; // Import the new settings component
import "./register.css"; // Import the new CSS file

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    client: "react_frontend", // Added client field
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [redirectCountdown, setRedirectCountdown] = useState(5); // Countdown timer
  const [redirecting, setRedirecting] = useState(false); // To trigger redirection
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter(); // To handle navigation

  const validateForm = () => {
    const { username, email, password } = formData;

    if (!username.trim()) return "Username is required.";
    if (!/^[a-zA-Z0-9]{3,16}$/.test(username))
      return "Username must be 3-16 characters and contain no special symbols.";

    if (!email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email address.";

    if (!password.trim()) return "Password is required.";
    if (password.length < 8) return "Password must be at least 8 characters.";

    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setRedirectCountdown(5);
    setRedirecting(false);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const backendApi = localStorage.getItem("backend_api");
    if (!backendApi) {
      setError("Backend API URL is not set.");
      router.push("/setup"); // Redirect to the setup page
      return;
    }

    try {
      const response = await fetch(`${backendApi}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(formData), // client field included in formData
      });

      if (response.ok) {
        setSuccess("Registration successful! Redirecting to login page...");
        setFormData({ username: "", email: "", password: "", client: "react_frontend" });

        // Start the countdown for redirection 
        setRedirecting(true);
      } else {
        const data = await response.json();
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again later.");
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (redirecting && redirectCountdown > 0) {
      timer = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setRedirecting(false); // Stop the countdown
          }
          return prev - 1;
        });
      }, 1000);
    }

    if (redirectCountdown === 0) {
      router.push("/login"); // Redirect to the login page
    }

    return () => clearInterval(timer); // Clean up the interval
  }, [redirecting, redirectCountdown, router]);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('dark_mode') === 'true';
    setIsDarkMode(storedDarkMode);
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : '';
  }, [isDarkMode]);

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-logo" style={{ textAlign: "center" }}>
          <img src={isDarkMode ? logoDark.src : logoLight.src} alt="Logo" width={200} height={200} />
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="register-input"
            autoComplete="username"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="register-input"
            autoComplete="email"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="register-input"
            autoComplete="new-password"
            required
          />
          <button
            type="submit"
            className="register-button"
          >
            Register
          </button>
        </form>
        {error && <p className="register-error">{error}</p>}
        {success && (
          <div className="register-success">
            {success}
            <p>Redirecting in {redirectCountdown} seconds...</p>
          </div>
        )}
        <p className="login-link" onClick={() => router.push("/auth/login")}>
          Already have an account? Login
        </p>
      </div>
      <Settings />
    </div>
  );
}
