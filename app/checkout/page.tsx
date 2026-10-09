import CheckoutForm from '@/components/CheckoutForm'; import { getSettings } from '@/lib/api';
export const metadata = { title: 'Checkout' };
export default async function Checkout() { const { fee, free } = await getSettings(); return <><h1 className="mb-3 text-2xl font-bold">Checkout</h1><CheckoutForm fee={fee} free={free} /></>; }
