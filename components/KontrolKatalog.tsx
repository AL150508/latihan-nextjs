"use client";

type Props = {
  cari: string;
  setancar: (val: string) => void;
  kategori: string;
  setKategori: (val: string) => void;
  urut: string;
  setUrut: (val: string) => void;
  hargaMaksimal: string;
  setHargaMaksimal: (val: string) => void;
  hanyaAdaTiket: boolean;
  setHanyaAdaTiket: (val: boolean) => void;
  daftarKategori: string[];
};

export default function KontrolKatalog({
  cari,
  setancar,
  kategori,
  setKategori,
  urut,
  setUrut,
  hargaMaksimal,
  setHargaMaksimal,
  hanyaAdaTiket,
  setHanyaAdaTiket,
  daftarKategori,
}: Props) {
  return (
    <div className="mb-4 flex flex-wrap gap-3 items-center">
      <input
        value={cari}
        onChange={(e) => setancar(e.target.value)}
        placeholder="Cari event..."
        className="rounded border bg-white px-3 py-2 text-black"
      />
      <select
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
        className="rounded border bg-white px-3 py-2 text-black"
      >
        {daftarKategori.map((k) => (
          <option key={k} value={k}>
            {k}
          </option>
        ))}
      </select>
      <select
        value={urut}
        onChange={(e) => setUrut(e.target.value)}
        className="rounded border bg-white px-3 py-2 text-black"
      >
        <option value="tanggal">Tanggal terdekat</option>
        <option value="murah">Harga termurah</option>
        <option value="mahal">Harga termahal</option>
        <option value="nama">Nama A-Z</option>
      </select>
      <input
        type="number"
        value={hargaMaksimal}
        onChange={(e) => setHargaMaksimal(e.target.value)}
        placeholder="Harga maksimal"
        className="rounded border bg-white px-3 py-2 text-black"
      />
      <label className="flex items-center gap-2 text-sm text-black">
        <input
          type="checkbox"
          checked={hanyaAdaTiket}
          onChange={(e) => setHanyaAdaTiket(e.target.checked)}
          className="rounded border"
        />
        Hanya yang masih ada tiket
      </label>
    </div>
  );
}
