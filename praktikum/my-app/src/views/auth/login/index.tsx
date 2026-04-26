import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import style from "../../auth/login/login.module.scss";

const TampilanLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter();
  const [error, setError] = useState("");
  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);

    const email = (formData.get("email") as string)?.trim();
    const password = (formData.get("password") as string) || "";

    if (!email) {
      setError("Email wajib diisi");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError(
          res.error === "CredentialsSignin"
            ? "Email atau password salah"
            : (res.error || "Login failed")
        );
      }
    } catch (error) {
      setIsLoading(false);
      setError("wrong email or password");
    }
  };

  return (
    <div className={style.login}>
      {error && <p className={style.login__error}>{error}</p>}
      <h1 className={style.login__title}>Halaman Login</h1>
      <form className={style.login__form} onSubmit={handleSubmit}>
        <div className={style.login__form__item}>
          <label
            htmlFor="email"
            className={style.login__form__item__label}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className={style.login__form__item__input}
            required
          />
        </div>

        <div className={style.login__form__item}>
          <label
            htmlFor="Password"
            className={style.login__form__item__label}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className={style.login__form__item__input}
            minLength={6}
            required
          />
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className={style.login__form__button}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>

        <p className={style.login__form__link}>
          Belum punya akun? <Link href="/auth/register">Ke Halaman Register</Link>
        </p>
      </form>
    </div>
  );
};

export default TampilanLogin;