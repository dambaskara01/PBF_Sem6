import fetcher from "@/utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailProduk from "../../views/DetailProduct";

const HalamanProdukCSR = () => {
  const { query } = useRouter();
  const productId = typeof query.produk === "string" ? query.produk : "";
  const { data, isLoading } = useSWR(
    productId ? `/api/produk/${productId}` : null,
    fetcher,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data?.data) {
    return <div>Produk tidak ditemukan.</div>;
  }

  return (
    <div>
      <DetailProduk products={data.data} />
    </div>
  );
};

export default HalamanProdukCSR;
