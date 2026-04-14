import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

type ProfileProps = {
  user: {
    fullname?: string | null;
  };
};

const HalamanProfile = ({ user }: ProfileProps) => {
  return (
    <div>
        <h1>Halaman Profile</h1><br />
        <h1>Selamat Datang {user?.fullname || "User"}</h1>
    </div>
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