import useSWR from "swr";

import TampilanProduk from "../../views/produk";
import fetcher from "../../utils/swr/fetcher";

const KategoriPage = () => {
  const { data, isLoading } = useSWR("/api/produk", fetcher);

  return (
    <div>
      <TampilanProduk products={isLoading ? [] : (data?.data ?? [])} />
    </div>
  );
};

export default KategoriPage;
