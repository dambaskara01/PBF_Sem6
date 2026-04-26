import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import style from "../../auth/register/register.module.scss";

const TampilanRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const fullname = formData.get("Fullname") as string;
    const password = formData.get("Password") as string;

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, fullname, password }),
    });

    if (response.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
      return;
    }

    setIsLoading(false);
    setError(
      response.status === 400
        ? "Email already exists"
        : "An error occurred"
    );
  };

  return (
    <div className={style.register}>
      {error && <p className={style.register__error}>{error}</p>}
      <h1 className={style.register__title}>Halaman Register</h1>
      <form className={style.register__form} onSubmit={handleSubmit}>
        <div className={style.register__form__item}>
          <label
            htmlFor="email"
            className={style.register__form__item__label}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className={style.register__form__item__input}
          />
        </div>

        <div className={style.register__form__item}>
          <label
            htmlFor="Fullname"
            className={style.register__form__item__label}
          >
            Fullname
          </label>
          <input
            type="text"
            id="Fullname"
            name="Fullname"
            placeholder="Fullname"
            className={style.register__form__item__input}
          />
        </div>

        <div className={style.register__form__item}>
          <label
            htmlFor="Password"
            className={style.register__form__item__label}
          >
            Password
          </label>
          <input
            type="password"
            id="Password"
            name="Password"
            placeholder="Password"
            className={style.register__form__item__input}
          />
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className={style.register__form__button}
        >
          {isLoading ? "Loading..." : "Register"}
        </button>

        <p className={style.register__form__link}>
          Sudah punya akun? <Link href="/auth/login">Ke Halaman Login</Link>
        </p>
      </form>
    </div>
  );
};

export default TampilanRegister;