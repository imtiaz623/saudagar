'use client';
import Link from 'next/link'; import { useEffect, useState } from 'react'; import { useCart } from '@/lib/cart';
export default function CartLink() {
  const n = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0)); const [m, setM] = useState(false); useEffect(() => setM(true), []);
  return <Link href="/cart" className="rounded bg-amber-500 px-3 py-2 text-sm font-semibold text-emerald-950">Cart{m && n ? ` (${n})` : ''}</Link>;
}
