import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./login.module.scss";

const TampilanLogin = () => {
  const { push } = useRouter();

  const handelLogin = () => {
    // logic login disini
    push("/produk");
  };

  return (
    <div className={styles.login}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
          Login
        </h1>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Masukkan email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Masukkan password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <button
          onClick={() => handelLogin()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-200 transform hover:scale-105"
        >
          Login
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
      </div>
    </div>
  );
};

export default TampilanLogin;