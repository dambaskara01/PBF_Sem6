import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeroSection from "@/views/produk/herosection";
import MainSection from "@/views/produk/mainsection";

const Produk = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    if (!isLogin) {
      push("/auth/login");
    }
  }, [isLogin, push]);

  return (
    <div>
      <HeroSection />
      <MainSection />
    </div>
  );
};

export default Produk;