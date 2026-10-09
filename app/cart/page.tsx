import CartView from '@/components/CartView'; import { getSettings } from '@/lib/api';
export const metadata = { title: 'Cart' };
export default async function Cart() { const { fee, free } = await getSettings(); return <><h1 className="mb-3 text-2xl font-bold">Your Cart</h1><CartView fee={fee} free={free} /></>; }
