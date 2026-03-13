const MainSection = () => {
  const produkList = [
    {
      id: 1,
      nama: "Produk 1",
      harga: "Rp 100.000",
      deskripsi: "Produk berkualitas tinggi dengan harga terjangkau",
    },
    {
      id: 2,
      nama: "Produk 2",
      harga: "Rp 150.000",
      deskripsi: "Produk pilihan dengan fitur lengkap",
    },
    {
      id: 3,
      nama: "Produk 3",
      harga: "Rp 200.000",
      deskripsi: "Produk premium untuk kebutuhan Anda",
    },
    {
      id: 4,
      nama: "Produk 4",
      harga: "Rp 120.000",
      deskripsi: "Produk bestseller kami",
    },
  ];

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Daftar Produk</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {produkList.map((produk) => (
          <div
            key={produk.id}
            className="border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1"
          >
            <div className="h-48 bg-gray-100 rounded mb-4 flex items-center justify-center text-gray-400">
              Gambar Produk
            </div>
            <h3 className="text-lg font-bold mb-2">{produk.nama}</h3>
            <p className="text-gray-600 text-sm mb-3">{produk.deskripsi}</p>
            <p className="text-xl font-bold text-blue-600 mb-4">{produk.harga}</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200">
              Lihat Detail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSection;
