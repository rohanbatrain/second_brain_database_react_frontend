"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [redirectCountdown, setRedirectCountdown] = useState(5);
    const [redirecting, setRedirecting] = useState(false);
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
            const response = await fetch("http://127.0.0.1:5000/auth/login", {
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
                localStorage.setItem("is_admin", data.is_admin); // Save is_admin to local storage
                setFormData({ email: "", password: "" });

                setRedirecting(true);
            } else {
                const data = await response.json();
                setError(data.message || "Login failed. Please try again.");
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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form
                className="bg-white p-6 rounded shadow-md"
                onSubmit={handleSubmit}
                noValidate
            >
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 border rounded text-black"
                    autoComplete="email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 border rounded text-black"
                    autoComplete="current-password"
                    required
                />
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && (
                <div className="text-green-500 mt-4">
                    {success}
                    <p>Redirecting in {redirectCountdown} seconds...</p>
                </div>
            )}
        </div>
    );
}
