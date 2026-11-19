import Link from "next/link";
import { alamatHalaman, type Saringan } from "@/data/saring";

export default function Halaman({
  s,
  hal,
  jumlah,
}: {
  s: Saringan;
  hal: number;
  jumlah: number;
}) {
  if (jumlah <= 1) return null;

  return (
    <div className="my-6 flex items-center gap-2">
      {hal > 1 && (
        <Link
          href={alamatHalaman(s, hal - 1)}
          className="rounded border px-3 py-1 text-sm"
        >
          &laquo; Sebelumnya
        </Link>
      )}

      {Array.from({ length: jumlah }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={alamatHalaman(s, n)}
          className={`rounded border px-3 py-1 text-sm ${
            n === hal ? "bg-blue-600 font-bold text-white" : ""
          }`}
        >
          {n}
        </Link>
      ))}

      {hal < jumlah && (
        <Link
          href={alamatHalaman(s, hal + 1)}
          className="rounded border px-3 py-1 text-sm"
        >
          Berikutnya &raquo;
        </Link>
      )}
    </div>
  );
}
