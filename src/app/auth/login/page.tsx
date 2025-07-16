"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/", // Redirect to main page after login
    });
    if (res?.error) {
      setError(res.error);
    } else if (res?.ok && res.url) {
      router.push(res.url); // Redirect to the main page
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 p-6 bg-card rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <Input
          type="email"
          name="email"
          autoComplete="username"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button type="submit" className="w-full">Login</Button>
        <div className="text-center text-sm mt-2">
          Don&apos;t have an account? <a href="/auth/signup" className="underline">Sign up</a>
        </div>
      </form>
    </div>
  );
} 