import Link from 'next/link'; import Image from 'next/image'; import ProductCard from '@/components/ProductCard'; import { getBanners, getCategories, getProducts } from '@/lib/api'; import type { Product } from '@/lib/types';
export const revalidate = 300;
function Section({ title, items }: { title: string; items: Product[] }) {
  if (!items.length) return null;
  return <section className="mt-8"><h2 className="mb-3 text-xl font-bold">{title}</h2><div className="grid grid-cols-2 gap-3 md:grid-cols-4">{items.slice(0, 8).map((p) => <ProductCard key={p.id} p={p} />)}</div></section>;
}
export default async function Home() {
  const [products, cats, banners] = await Promise.all([getProducts(), getCategories(), getBanners()]); const hero = banners[0];
  return (<>
    <div className="relative flex min-h-48 items-center overflow-hidden rounded-xl bg-emerald-900 p-6 text-white md:min-h-72">
      {hero?.Image && <Image src={hero.Image} alt={hero.Title || ''} fill priority sizes="100vw" className="object-cover opacity-60" />}
      <div className="relative"><h1 className="text-2xl font-bold md:text-4xl">{hero?.Title || 'Welcome to Saudagar'}</h1><Link href={hero?.Link || '/shop'} className="mt-4 inline-block rounded bg-amber-500 px-5 py-2 font-semibold text-emerald-950">Shop Now</Link></div></div>
    {cats.length > 0 && <section className="mt-8"><h2 className="mb-3 text-xl font-bold">Categories</h2><div className="flex gap-2 overflow-x-auto">{cats.map((c) => <Link key={c.CategoryID} href={`/shop?category=${encodeURIComponent(c.Name)}`} className="whitespace-nowrap rounded-full border bg-white px-4 py-2 text-sm">{c.Name}</Link>)}</div></section>}
    <Section title="Featured" items={products.filter((p) => p.featured)} /><Section title="New Arrivals" items={products.filter((p) => p.newArrival)} />
    <Section title="Best Sellers" items={products.filter((p) => p.bestSeller)} /><Section title="On Sale" items={products.filter((p) => p.salePrice && p.salePrice < p.price)} />
    {!products.length && <p className="mt-8">No products yet. Add products in your Google Sheet.</p>}</>);
}
