import Link from 'next/link'; import Image from 'next/image'; import { price, rs, type Product } from '@/lib/types';
export default function ProductCard({ p }: { p: Product }) {
  const sale = price(p) < p.price;
  return (
    <Link href={`/product/${p.slug}`} className="block overflow-hidden rounded-lg border bg-white shadow-sm hover:shadow-md">
      <div className="relative aspect-square bg-stone-100">
        {p.image && <Image src={p.image} alt={p.name} fill sizes="(max-width:640px) 50vw, 25vw" className="object-cover" loading="lazy" />}
        {p.outOfStock && <span className="absolute left-2 top-2 rounded bg-stone-800 px-2 py-1 text-xs text-white">Out of Stock</span>}
        {sale && !p.outOfStock && <span className="absolute left-2 top-2 rounded bg-red-600 px-2 py-1 text-xs text-white">Sale</span>}
      </div>
      <div className="p-3"><h3 className="line-clamp-2 text-sm font-medium">{p.name}</h3>
        <p className="mt-1 font-semibold text-emerald-900">{rs(price(p))} {sale && <s className="ml-1 text-xs font-normal text-stone-400">{rs(p.price)}</s>}</p></div>
    </Link>);
}
