"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoLight from "../assets/logo_light_tp.png"; // Adjust the path to your light mode logo image
import logoDark from "../assets/logo_dark_tp.png"; // Adjust the path to your dark mode logo image
import Settings from "../components/settings"; // Import the new settings component
import "./login.css"; // Import the new CSS file

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [redirectCountdown, setRedirectCountdown] = useState(5);
    const [redirecting, setRedirecting] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const router = useRouter();

    const validateForm = () => {
        const { email, password } = formData;

        if (!email.trim()) return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email address.";

        if (!password.trim()) return "Password is required.";

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

        try {
            const backendApi = localStorage.getItem("backend_api");
            const response = await fetch(`${backendApi}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccess("Login successful! Redirecting to dashboard...");
                localStorage.setItem("Token", data.token);
                localStorage.setItem("role", data.role); // Save role to local storage
                setFormData({ email: "", password: "" });

                setRedirecting(true);
            } else {
                const data = await response.json();
                setError(data.message || "Login failed. Please try again.");
            }
        } catch () {
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
                        setRedirecting(false);
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        if (redirectCountdown === 0) {
            router.push("/dashboard");
        }

        return () => clearInterval(timer);
    }, [redirecting, redirectCountdown, router]);

    useEffect(() => {
        const storedDarkMode = localStorage.getItem('dark_mode') === 'true';
        setIsDarkMode(storedDarkMode);
    }, []);

    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-mode' : '';
    }, [isDarkMode]);

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-logo" style={{ textAlign: "center" }}>
                    <Image src={isDarkMode ? logoDark : logoLight} alt="Logo" width={200} height={200} />
                </div>
                <form onSubmit={handleSubmit} noValidate>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="login-input"
                        autoComplete="email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="login-input"
                        autoComplete="current-password"
                        required
                    />
                    <button
                        type="submit"
                        className="login-button"
                    >
                        Login
                    </button>
                </form>
                {error && <p className="login-error">{error}</p>}
                {success && (
                    <div className="login-success">
                        {success}
                        <p>Redirecting in {redirectCountdown} seconds...</p>
                    </div>
                )}
                <p className="register-link" onClick={() => router.push("/register")}>
                    Don&apost have an account? Register
                </p>
            </div>
            <Settings />
        </div>
    );
}
