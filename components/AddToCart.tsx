'use client';
import { useState } from 'react'; import { useCart } from '@/lib/cart'; import { price, type Product } from '@/lib/types';
export default function AddToCart({ p }: { p: Product }) {
  const add = useCart((s) => s.add); const [ok, setOk] = useState(false);
  if (p.outOfStock) return <button disabled className="w-full rounded bg-stone-300 py-3 font-semibold">Out of Stock</button>;
  return <button className="w-full rounded bg-emerald-900 py-3 font-semibold text-white" onClick={() => { add({ id: p.id, name: p.name, price: price(p), image: p.image, slug: p.slug }); setOk(true); setTimeout(() => setOk(false), 1500); }}>{ok ? 'Added ✓' : 'Add to Cart'}</button>;
}
