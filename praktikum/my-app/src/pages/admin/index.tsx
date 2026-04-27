import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import styles from "./admin.module.scss";

type AdminPageProps = {
  user: {
    fullname?: string | null;
    email?: string | null;
    role?: string | null;
  };
};

const HalamanAdmin = ({ user }: AdminPageProps) => {
  return (
    <section className={styles.admin}>
      <div className={styles.card}>
        <span className={styles.badge}>Admin Panel</span>
        <h1 className={styles.title}>Halaman Admin</h1>
        <p className={styles.subtitle}>
          Area ini hanya bisa diakses oleh pengguna dengan role admin.
        </p>

        <div className={styles.info}>
          <div className={styles.row}>
            <span className={styles.label}>Nama</span>
            <span className={styles.value}>{user?.fullname || "-"}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Email</span>
            <span className={styles.value}>{user?.email || "-"}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Role</span>
            <span className={styles.value}>{user?.role || "user"}</span>
          </div>
        </div>
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

  const sessionUser = session.user as {
    fullname?: string | null;
    email?: string | null;
    role?: string | null;
  };

  if (sessionUser.role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: sessionUser,
    },
  };
};

export default HalamanAdmin;