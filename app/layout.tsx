import './globals.css'; import Link from 'next/link'; import CartLink from '@/components/CartLink';
export const metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'), title: { default: 'Saudagar', template: '%s | Saudagar' }, description: 'Saudagar - shop quality products online with Cash on Delivery.' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className="bg-stone-50 text-stone-900">
    <header className="sticky top-0 z-10 bg-emerald-900 text-white"><div className="mx-auto flex max-w-6xl items-center gap-3 p-3">
      <Link href="/" className="text-xl font-bold text-amber-400">Saudagar</Link>
      <form action="/shop" className="flex-1"><input name="q" placeholder="Search products" className="w-full rounded px-3 py-2 text-stone-900" /></form>
      <Link href="/shop" className="hidden text-sm sm:block">Shop</Link><Link href="/track" className="hidden text-sm sm:block">Track Order</Link><CartLink /></div></header>
    <main className="mx-auto max-w-6xl p-3">{children}</main>
    <footer className="mt-10 bg-emerald-950 p-6 text-center text-sm text-stone-300">© Saudagar. All rights reserved.</footer></body></html>);
}
