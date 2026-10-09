"use client";
import { useState, useEffect, Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import { useSearchParams } from "next/navigation";

function ShopContent() {
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") || "").toLowerCase();
  const category = searchParams.get("category") || "";
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts().then((res: any) => setProducts(res || [])).catch(() => setProducts([]));
  }, []);

  const list = products.filter(p => (!category || p.category === category) && (!q || `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q)));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {list.map(product => (
          <ProductCard key={product.id || product.slug} p={product} />
        ))}
      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div>Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
