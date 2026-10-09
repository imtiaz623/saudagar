'use client';
import Link from 'next/link'; import { useEffect, useState } from 'react'; import { useCart } from '@/lib/cart'; import { rs } from '@/lib/types';
export function useTotals(fee: number, free: number) {
  const items = useCart((s) => s.items); const sub = items.reduce((a, i) => a + i.price * i.qty, 0);
  const ship = items.length && !(free && sub >= free) ? fee : 0; return { items, sub, ship, total: sub + ship };
}
export function Summary({ sub, ship }: { sub: number; ship: number }) {
  return <div className="space-y-1 text-sm"><p className="flex justify-between"><span>Subtotal</span>{rs(sub)}</p><p className="flex justify-between"><span>Shipping</span>{ship ? rs(ship) : 'Free'}</p>
    <p className="flex justify-between"><span>Discount</span>Rs. 0</p><p className="flex justify-between border-t pt-2 text-base font-bold"><span>Total</span>{rs(sub + ship)}</p></div>;
}
export default function CartView({ fee, free }: { fee: number; free: number }) {
  const { setQty, remove } = useCart(); const { items, sub, ship } = useTotals(fee, free);
  const [m, setM] = useState(false); useEffect(() => setM(true), []);
  if (!m) return <p className="p-6">Loading…</p>;
  if (!items.length) return <p className="p-6">Your cart is empty. <Link className="underline" href="/shop">Continue shopping</Link></p>;
  return (<div className="grid gap-6 md:grid-cols-3"><div className="space-y-3 md:col-span-2">
    {items.map((i) => (<div key={i.id} className="flex items-center gap-3 rounded border bg-white p-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {i.image && <img src={i.image} alt="" className="h-16 w-16 rounded object-cover" />}
      <div className="flex-1"><Link href={`/product/${i.slug}`} className="text-sm font-medium">{i.name}</Link><p className="text-sm text-emerald-900">{rs(i.price)}</p></div>
      <div className="flex items-center gap-2"><button aria-label="Decrease" className="h-8 w-8 rounded border" onClick={() => setQty(i.id, i.qty - 1)}>−</button><span>{i.qty}</span><button aria-label="Increase" className="h-8 w-8 rounded border" onClick={() => setQty(i.id, i.qty + 1)}>+</button></div>
      <button className="text-xs text-red-600" onClick={() => remove(i.id)}>Remove</button></div>))}</div>
    <div className="h-fit space-y-4 rounded border bg-white p-4"><Summary sub={sub} ship={ship} /><Link href="/checkout" className="block rounded bg-emerald-900 py-3 text-center font-semibold text-white">Checkout</Link></div></div>);
}
