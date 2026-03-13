import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./register.module.css";

const HalamanRegister = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { push } = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Semua field harus diisi!");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }

    // Logic register disini
    console.log("Register data:", formData);
    alert("Registrasi berhasil!");
    push("/auth/login");
  };

  return (
    <div className={styles.register}>
      <div className={styles.container}>
        <h1 className={`${styles.title} text-purple-600`}>Buat Akun Baru</h1>
        
        <form className={styles.form} onSubmit={handleRegister}>
          <div className={styles.formGroup}>
            <label className={`${styles.label} text-purple-700`}>Nama Lengkap</label>
            <input
              className={`${styles.input} hover:border-purple-500 focus:ring-purple-500`}
              type="text"
              name="fullName"
              placeholder="Masukkan nama lengkap"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={`${styles.label} text-purple-700`}>Email</label>
            <input
              className={`${styles.input} hover:border-purple-500 focus:ring-purple-500`}
              type="email"
              name="email"
              placeholder="Masukkan email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={`${styles.label} text-purple-700`}>Password</label>
            <input
              className={`${styles.input} hover:border-purple-500 focus:ring-purple-500`}
              type="password"
              name="password"
              placeholder="Masukkan password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={`${styles.label} text-purple-700`}>Konfirmasi Password</label>
            <input
              className={`${styles.input} hover:border-purple-500 focus:ring-purple-500`}
              type="password"
              name="confirmPassword"
              placeholder="Konfirmasi password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={`${styles.button} transform transition-transform duration-200`}>
            Register
          </button>
        </form>

        <div className={styles.footer}>
          Sudah punya akun?{" "}
          <Link href="/auth/login">
            <span className={`${styles.link} mb-2 inline-block`}>Login di sini</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HalamanRegister;