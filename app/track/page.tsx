'use client';
import { useState } from 'react';
const STEPS = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];
export default function Track() {
  const [res, setRes] = useState<any>(null); const [busy, setBusy] = useState(false);
  async function go(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); const f = new FormData(e.currentTarget);
    const q = new URLSearchParams({ orderId: String(f.get('orderId')), phone: String(f.get('phone')) });
    setRes(await fetch('/api/track?' + q).then((r) => r.json()).catch(() => ({ ok: false, error: 'Network error.' }))); setBusy(false);
  }
  const st = res?.ok ? res.data.status : ''; const idx = STEPS.indexOf(st);
  return (<div className="mx-auto max-w-md space-y-4"><h1 className="text-2xl font-bold">Track Your Order</h1>
    <form onSubmit={go} className="space-y-3"><input name="orderId" required placeholder="Order ID (e.g. ORD1001)" className="w-full rounded border p-2" /><input name="phone" required type="tel" placeholder="Phone number" className="w-full rounded border p-2" />
      <button disabled={busy} className="w-full rounded bg-emerald-900 py-3 font-semibold text-white">{busy ? 'Checking…' : 'Track'}</button></form>
    {res && !res.ok && <p className="text-red-600">{res.error}</p>}
    {res?.ok && <div className="rounded border bg-white p-4"><p className="font-semibold">Order #{res.data.orderId}</p>
      {idx < 0 ? <p className="mt-2 text-lg font-bold">{st}</p> : <ol className="mt-3 space-y-2">{STEPS.map((s, i) => <li key={s} className={i <= idx ? 'font-semibold text-emerald-900' : 'text-stone-400'}>{i <= idx ? '●' : '○'} {s}</li>)}</ol>}</div>}</div>);
}
