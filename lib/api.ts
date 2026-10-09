// Server-only. The token never reaches the browser. Swap these functions to move to Firestore later.
import type { Product } from './types';
const URL_ = process.env.APPS_SCRIPT_URL!, TOKEN = process.env.APPS_SCRIPT_TOKEN!;
async function get<T>(action: string): Promise<T> {
  const r = await fetch(`${URL_}?action=${action}&token=${TOKEN}`, { next: { revalidate: 300 } });
  const j = await r.json(); if (!j.ok) throw new Error(j.error || 'API error'); return j.data;
}
export const getProducts = () => get<Product[]>('products');
export const getCategories = () => get<{ CategoryID: string; Name: string; Slug: string; Image: string }[]>('categories');
export const getBanners = () => get<{ Title: string; Image: string; Link: string }[]>('banners');
export const getSettings = async () => { const s = await get<Record<string, string>>('settings'); return { fee: Number(s.ShippingFee) || 0, free: Number(s.FreeShippingOver) || 0 }; };
export async function trackOrder(id: string, phone: string) { // never cached
  const r = await fetch(`${URL_}?action=track&token=${TOKEN}&orderId=${encodeURIComponent(id)}&phone=${encodeURIComponent(phone)}`, { cache: 'no-store' });
  return r.json();
}
export async function createOrder(order: unknown) {
  const r = await fetch(URL_, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ action: 'createOrder', token: TOKEN, order }), cache: 'no-store' });
  return r.json();
}
