'use client';
import { useRouter } from 'next/navigation'; import { useEffect, useState } from 'react'; import { useCart } from '@/lib/cart'; import { Summary, useTotals } from './CartView';
const F = 'w-full rounded border p-2';
export default function CheckoutForm({ fee, free }: { fee: number; free: number }) {
  const router = useRouter(); const clear = useCart((s) => s.clear); const { items, sub, ship } = useTotals(fee, free);
  const [m, setM] = useState(false); useEffect(() => setM(true), []);
  const [busy, setBusy] = useState(false); const [err, setErr] = useState('');
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setErr('');
    const b = Object.fromEntries(new FormData(e.currentTarget) as any);
    const r = await fetch('/api/order', { method: 'POST', body: JSON.stringify({ ...b, items: items.map((i) => ({ id: i.id, qty: i.qty })) }) }).then((x) => x.json()).catch(() => ({ ok: false, error: 'Network error. Please try again.' }));
    if (r.ok) { clear(); router.push(`/order/${r.orderId}`); } else { setErr(r.error || 'Order failed'); setBusy(false); }
  }
  if (!m) return <p className="p-6">Loading…</p>;
  if (!items.length) return <p className="p-6">Your cart is empty.</p>;
  return (<form onSubmit={submit} className="grid gap-6 md:grid-cols-3"><div className="space-y-3 md:col-span-2">
    <input name="website" tabIndex={-1} autoComplete="off" className="hidden" />
    <input name="name" required placeholder="Full name *" className={F} /><input name="phone" required type="tel" placeholder="Phone *" className={F} />
    <input name="email" type="email" placeholder="Email (optional)" className={F} /><textarea name="address" required placeholder="Full address *" className={F} />
    <div className="grid grid-cols-3 gap-3"><input name="city" required placeholder="City *" className={F} /><input name="area" placeholder="Area" className={F} /><input name="postal" placeholder="Postal code" className={F} /></div>
    <textarea name="notes" placeholder="Order notes" className={F} /><p className="rounded border bg-white p-3 text-sm">Payment: <b>Cash on Delivery</b></p></div>
    <div className="h-fit space-y-4 rounded border bg-white p-4"><Summary sub={sub} ship={ship} />{err && <p className="text-sm text-red-600">{err}</p>}
      <button disabled={busy} className="w-full rounded bg-emerald-900 py-3 font-semibold text-white disabled:opacity-50">{busy ? 'Placing order…' : 'Place Order'}</button></div></form>);
}
