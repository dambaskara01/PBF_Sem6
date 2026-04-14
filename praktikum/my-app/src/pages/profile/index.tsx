import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import styles from "./profile.module.scss";

type ProfileProps = {
  user: {
    fullname?: string | null;
    email?: string | null;
  };
};

const HalamanProfile = ({ user }: ProfileProps) => {
  const initial = user?.fullname?.charAt(0)?.toUpperCase() || "U";

  return (
    <section className={styles.profile}>
      <div className={styles.card}>
        <div className={styles.avatar}>{initial}</div>

        <h1 className={styles.title}>Halaman Profile</h1>
        <p className={styles.subtitle}>Selamat datang kembali</p>

        <div className={styles.info}>
          <div className={styles.row}>
            <span className={styles.label}>Full Name</span>
            <span className={styles.value}>{user?.fullname || "User"}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Email</span>
            <span className={styles.value}>{user?.email || "-"}</span>
          </div>
        </div>

        <button className={styles.button} onClick={() => signOut({ callbackUrl: "/auth/login" })}>
          Sign Out
        </button>
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user ?? null,
    },
  };
};

export default HalamanProfile;