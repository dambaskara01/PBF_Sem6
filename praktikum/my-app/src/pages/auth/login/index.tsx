import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import styles from "./login.module.scss";

const TampilanLogin = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      fullname,
    });

    setIsLoading(false);

    if (result?.ok) {
      push("/produk");
      return;
    }

    setError("Full name, email, atau password tidak valid");
  };

  return (
    <div className={styles.login}>
      <form className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full" onSubmit={handleLogin}>
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
          Login
        </h1>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Masukkan nama"
            value={fullname}
            onChange={(event) => setFullname(event.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        {error && (
          <p className="mb-6 text-sm font-semibold text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-200 transform hover:scale-105"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>

        <div className="mt-6 p-3 bg-red-100 border border-red-400 rounded-md">
          <p className="text-red-700 text-sm font-semibold">
            Belum punya akun?
          </p>
          <Link href="/auth/register">
            <span className="text-blue-600 font-bold hover:underline cursor-pointer">
              Daftar di sini
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default TampilanLogin;