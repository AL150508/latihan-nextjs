"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { rupiah, type Event } from "@/data/events";

export default function DaftarFavorit() {
  const [semua, setSemua] = useState<Event[]>([]);
  const [ids, setIds] = useState<number[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [galat, setGalat] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIds(JSON.parse(localStorage.getItem("favorit") ?? "[]"));
    fetch("/api/events")
      .then((r) => {
        if (!r.ok) throw new Error("Gagal mengambil data");
        return r.json();
      })
      .then((d: Event[]) => setSemua(d))
      .catch((e: Error) => setGalat(e.message))
      .finally(() => setMemuat(false));
  }, []);

  if (memuat) return <p className="text-slate-200">Memuat...</p>;
  if (galat) return <p className="text-red-500">{galat}</p>;

  const daftar = semua.filter((e) => ids.includes(e.id));
  if (daftar.length === 0)
    return <p className="text-slate-400">Belum ada favorit.</p>;

  return (
    <ul className="space-y-2">
      {daftar.map((e) => (
        <li
          key={e.id}
          className="flex justify-between items-center border-b pb-2"
        >
          <Link
            href={`/event/${e.id}`}
            className="text-blue-400 hover:underline"
          >
            {e.judul}
          </Link>
          <span className="font-semibold text-slate-200">
            {rupiah(e.harga)}
          </span>
        </li>
      ))}
    </ul>
  );
}
