"use client";
import { useState, useEffect } from "react";
import { rupiah, type Event } from "@/data/events";
import KartuEvent from "./KartuEvent";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  
  const [urut, setUrut] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("urut") || "tanggal";
    }
    return "tanggal";
  });

  const [hanyaAdaTiket, setHanyaAdaTiket] = useState(false);
  const [hargaMaksimal, setHargaMaksimal] = useState("");
  const [batas, setBatas] = useState(4);

  // Blok useEffect untuk localStorage bisa dihapus karena sudah digantikan di atas
  const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];

  const tanganiCari = (val: string) => {
    setCari(val);
    setBatas(4);
  };

  const tanganiKategori = (val: string) => {
    setKategori(val);
    setBatas(4);
  };

  const tanganiUrut = (val: string) => {
    setUrut(val);
    setBatas(4);
    localStorage.setItem("urut", val);
  };

  const tanganiCekTiket = (val: boolean) => {
    setHanyaAdaTiket(val);
    setBatas(4);
  };

  const tanganiHargaMaks = (val: string) => {
    setHargaMaksimal(val);
    setBatas(4);
  };

  const hasil = events.filter((e) => {
    const sisa = e.kuota - e.terisi;
    const cocokCari = e.judul.toLowerCase().includes(cari.toLowerCase());
    const cocokKategori = kategori === "Semua" || e.kategori === kategori;
    const cocokTiket = !hanyaAdaTiket || sisa > 0;
    const cocokHarga = hargaMaksimal === "" || e.harga <= Number(hargaMaksimal);

    return cocokCari && cocokKategori && cocokTiket && cocokHarga;
  });

  const tersusun = [...hasil].sort((a, b) => {
    if (urut === "murah") return a.harga - b.harga;
    if (urut === "mahal") return b.harga - a.harga;
    if (urut === "nama") return a.judul.localeCompare(b.judul);
    return a.tanggal.localeCompare(b.tanggal);
  });

  const totalHarga = tersusun.reduce((acc, e) => acc + e.harga, 0);
  const rataRataHarga = tersusun.length > 0 ? totalHarga / tersusun.length : 0;
  const totalSisaTiket = tersusun.reduce(
    (acc, e) => acc + (e.kuota - e.terisi),
    0,
  );

  const tampil = tersusun.slice(0, batas);
  const sisa = tersusun.length - tampil.length;

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3 items-center">
        <input
          value={cari}
          onChange={(e) => tanganiCari(e.target.value)}
          placeholder="Cari event..."
          className="rounded border bg-white px-3 py-2 text-black"
        />
        <select
          value={kategori}
          onChange={(e) => tanganiKategori(e.target.value)}
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
          onChange={(e) => tanganiUrut(e.target.value)}
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
          onChange={(e) => tanganiHargaMaks(e.target.value)}
          placeholder="Harga maksimal"
          className="rounded border bg-white px-3 py-2 text-black"
        />
        <label className="flex items-center gap-2 text-sm text-black">
          <input
            type="checkbox"
            checked={hanyaAdaTiket}
            onChange={(e) => tanganiCekTiket(e.target.checked)}
            className="rounded border"
          />
          Hanya yang masih ada tiket
        </label>
      </div>

      <p className="mb-1 text-sm text-slate-400">
        {tersusun.length} event ditemukan
      </p>
      <p className="mb-3 text-sm text-slate-400">
        Rata-rata harga {rupiah(rataRataHarga)} · Total sisa tiket{" "}
        {totalSisaTiket}
      </p>

      {tersusun.length === 0 ? (
        <p className="text-slate-400">Tidak ada event yang cocok.</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tampil.map((e) => (
              <KartuEvent key={e.id} event={e} />
            ))}
          </div>
          {sisa > 0 && (
            <button
              onClick={() => setBatas((prev) => prev + 4)}
              className="mt-6 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-800 text-white"
            >
              Tampilkan lagi ({sisa} lagi)
            </button>
          )}
        </>
      )}
    </div>
  );
}
