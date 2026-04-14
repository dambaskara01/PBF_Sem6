import TampilanProduk from "../../views/produk";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProdukPage = () => {
  const { data, isLoading } = useSWR("/api/produk", fetcher);

  return (
    <div>
      <TampilanProduk products={isLoading ? [] : (data?.data ?? [])} />
    </div>
  );
};

export default ProdukPage;