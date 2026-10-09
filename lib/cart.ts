'use client';
import { create } from 'zustand'; import { persist } from 'zustand/middleware';
export type Item = { id: string; name: string; price: number; image: string; slug: string; qty: number };
type S = { items: Item[]; add: (i: Omit<Item, 'qty'>) => void; setQty: (id: string, q: number) => void; remove: (id: string) => void; clear: () => void };
export const useCart = create<S>()(persist((set) => ({
  items: [],
  add: (i) => set((s) => ({ items: s.items.some((x) => x.id === i.id) ? s.items.map((x) => x.id === i.id ? { ...x, qty: Math.min(x.qty + 1, 20) } : x) : [...s.items, { ...i, qty: 1 }] })),
  setQty: (id, q) => set((s) => ({ items: q < 1 ? s.items.filter((x) => x.id !== id) : s.items.map((x) => x.id === id ? { ...x, qty: Math.min(q, 20) } : x) })),
  remove: (id) => set((s) => ({ items: s.items.filter((x) => x.id !== id) })),
  clear: () => set({ items: [] }),
}), { name: 'saudagar-cart' }));
